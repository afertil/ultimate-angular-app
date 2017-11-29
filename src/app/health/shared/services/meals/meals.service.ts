import { Meal } from './meals.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, map } from 'rxjs/operators';

import { Store } from '../../../../../store';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Meal {
  name: string;
  ingredients: string[];
  key: string;
  exists: () => boolean;
}

@Injectable()
export class MealsService {

  storeData: any[];

  meals$: Observable<any> = this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges()
    .map(actions => {
      this.storeData = [];

      actions.map(action => {
        this.storeData.push(({ key: action.key, ...action.payload.val() }));
        return ({ key: action.key, ...action.payload.val() });
      });

      this.store.set('meals', this.storeData);
    });

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getMeal(key: string) {
    if (!key) {
      return Observable.of({});
    }

    return this.store.select<Meal[]>('meals')
      .filter(Boolean)
      .map(meals => meals.find((meal: Meal) => meal.key === key));
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
