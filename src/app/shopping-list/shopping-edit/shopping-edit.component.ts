import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingList } from 'src/app/services/shoppinglist.service';
import { ToggleActiveClassDirective } from 'src/app/toggle-active-class.directive';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild(ToggleActiveClassDirective) deleteDirective: ToggleActiveClassDirective
  @ViewChild('form') form
  
  
  constructor(private shoppingListService: ShoppingList) { }
  @Input('activeClass') ingredientActiveClass: ElementRef

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.form.value.name
    const ingAmount = this.form.value.amount
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingListService.ingredientAdded.next(newIngredient)
  }

  clearItems() {
    this.shoppingListService.ingredientAdded.next([])
  }

  deleteItems() {
    this.shoppingListService.deleteShoppingIngredients.complete()
  }

}
