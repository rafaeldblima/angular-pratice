import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.services';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.put('https://recipe-book-a68ac.firebaseio.com/recipes.json?auth=' + token,
    return this.httpClient.put('https://recipe-book-a68ac.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        observe: 'body',
        params: new HttpParams().set('auth', token)
        // ,headers: new HttpHeaders().set('Authorization', 'token auth xxxx')
      });
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>('https://recipe-book-a68ac.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (recipes) => {
          // const recipes: Recipe[] = res.json(); //res:Response
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  // getRecipes() {
  //   const token = this.authService.getToken();
  //   this.httpClient.get('https://recipe-book-a68ac.firebaseio.com/recipes.json?auth=' + token, {
  //     observe: 'response',
  //     responseType: 'text'
  //   })
  //     .map(
  //       (recipes) => {
  //         console.log(recipes);
  //         // const recipes: Recipe[] = res.json(); //res:Response
  //         // for (const recipe of recipes) {
  //         //   if (!recipe['ingredients']) {
  //         //     recipe['ingredients'] = [];
  //         //   }
  //         // }
  //         // return recipes;
  //       }
  //     )
  //     .subscribe(
  //       (recipes: Recipe[]) => {
  //         this.recipeService.setRecipes(recipes);
  //       }
  //     );
  // }
}
