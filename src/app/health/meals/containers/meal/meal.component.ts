import { Component } from '@angular/core';

import { Meal } from './../../../shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/assets/food.svg">
          <span>Create meal</span>
        </h1>
      </div>
      <div>
        <app-meal-form
          (create)="addMeal($event)">
        </app-meal-form>
      </div>
    </div>
  `
})
export class MealComponent {
  constructor() {}

  addMeal(event: Meal) {
    console.log('Meal:', event);
  }
}
