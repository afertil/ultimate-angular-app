import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, map } from 'rxjs/operators';

import { Store } from '../../../../../store';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';

export interface Workout {
  name: string;
  type: string;
  strenght: any;
  endurance: any;
  timestamp: number;
  key: string;
  exists: () => boolean;
}

@Injectable()
export class WorkoutsService {

  storeData: any[];

  workouts$: Observable<any> = this.db.list<Workout>(`workouts/${this.uid}`).snapshotChanges()
    .map(actions => {
      this.storeData = [];

      actions.map(action => {
        this.storeData.push(({ key: action.key, ...action.payload.val() }));
        return ({ key: action.key, ...action.payload.val() });
      });

      this.store.set('workouts', this.storeData);
    });

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key) {
      return Observable.of({});
    }

    return this.store.select<Workout[]>('workouts')
      .filter(Boolean)
      .map(workouts => workouts.find((workout: Workout) => workout.key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
