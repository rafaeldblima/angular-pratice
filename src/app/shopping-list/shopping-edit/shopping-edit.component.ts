import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
  }
  sendIngredient(name, amount) {
    const ingredient = new Ingredient(name.value, amount.value);
    this.shoppinglistService.addIngredient(ingredient);
  }

}
