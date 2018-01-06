import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }
  sendIngredient(name, amount) {
    const ingredient = new Ingredient(name.value, amount.value);
    this.addIngredient.emit(ingredient);
  }

}
