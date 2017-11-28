import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

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

  meals$: Observable<Meal[]> = this.db.list<Meal>(`meals/${this.uid}`).valueChanges()
    .do(next => {
      console.log(next);
      this.store.set('meals', next);
    });

  /* meals$ = this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges()
    .map(actions => {
      actions.map(action => {
        // this.store.set('meals', ({ key: action.key, ...action.payload.val() }));
        console.log(this.store.select<Meal[]>('meals'));
        return ({ key: action.key, ...action.payload.val() });
      }).subscribe(items => {
        return items.map(item => item.key);
      });
    }); */

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
