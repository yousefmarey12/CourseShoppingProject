import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  DoCheck,
  ViewChildren,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingList } from 'src/app/services/shoppinglist.service';
import { ToggleActiveClassDirective } from 'src/app/toggle-active-class.directive';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChildren(ToggleActiveClassDirective) ToggleDirective: ToggleActiveClassDirective[]
  @ViewChild('form') form
  // the 'sub' subscription allows us to subscribe to the edits made
  sub: Subscription
  // this tells us whether we are allowed to edit or not
  subEditMode: Subscription
  // If true, then allowed to edit. If false, no edit
  editMode: boolean = false
  // index of the item we're editing
  editItemIndex: number
  // what we're editing
  editedItem: Ingredient
  

  constructor(private shoppingListService: ShoppingList) { }

   ngOnInit() {
    // we got the index from onSelectItem remember. 
    this.sub = this.shoppingListService.editIngredient.subscribe((index) => {
      this.editItemIndex = index
      this.editMode = this.ToggleDirective.some((el, index, value) => {
        return el.checkIfAnyActive()
      })
      this.editedItem = this.shoppingListService.getIngredient(index)
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  // even trying to make sure that we're getting the right values, no luck
  ngDoCheck(): void {
    this.subEditMode = this.shoppingListService.editMode.subscribe((value) => {
      this.editMode = value
    })
  }

  // just unsubscribing to avoid memory leaks
  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.subEditMode.unsubscribe()
  }

  // 
  onAddOrEditItem() {
    const ingName = this.form.value.name
    const ingAmount = this.form.value.amount
    const newIngredient = new Ingredient(ingName, ingAmount);
    // most code is irrelevent, the only code that's relevent is the editMode
    if (this.editMode) {
      console.log(this.editItemIndex)
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient)
    }
    else {
      this.shoppingListService.ingredientAdded.next(newIngredient)

    }
    this.form.reset()
  }


    // Just simply passing an empty array to clear items
    clearItems() {
    this.shoppingListService.ingredientAdded.next([])
    }

    // this method could be a part of the problem
    deleteItems() {
      // it could be this first line because we use the directive when we subscribe to it.
    this.shoppingListService.deleteShoppingIngredients.next('delete')
    this.form.reset()

  }

}
