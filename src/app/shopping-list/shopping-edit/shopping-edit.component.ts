import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;
  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppinglistService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editItemIndex = index;
          this.editItem = this.shoppinglistService.getIngredient(index);
          this.ingredientForm.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount
          });
        }
      );
  }
  onSubmit(f: NgForm) {
    const value = f.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(this.editItemIndex, ingredient);
    } else {
      this.shoppinglistService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDelete() {
    this.shoppinglistService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
