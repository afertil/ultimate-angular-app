import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Meal, MealsService } from './../../../shared/services/meals/meals.service';

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
  constructor(
    private mealService: MealsService,
    private router: Router
  ) {}

  async addMeal(event: Meal) {
    await this.mealService.addMeal(event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
