import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Lasanha',
      'Macarrão',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Lasagne_-_stonesoup.jpg/250px-Lasagne_-_stonesoup.jpg',
      [
        new Ingredient('Cheese', 5),
        new Ingredient('Pasta', 2)
      ]),
    new Recipe('Filé',
      'Só o filé',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Doryfill.JPG/200px-Doryfill.JPG',
      [
        new Ingredient('Steak', 1),
        new Ingredient('French Fries', 20)
      ])
  ];
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
}
