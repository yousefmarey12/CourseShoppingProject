import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingList } from '../services/shoppinglist.service';
import { ToggleActiveClassDirective } from '../toggle-active-class.directive';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild(ToggleActiveClassDirective) ToggleDirective: ToggleActiveClassDirective
  ingredients: Ingredient[]
  
  private sub: Subscription
  private subForRemoved: Subscription

  currentClickedLink = []
  
  constructor(private shoppingListSerivce: ShoppingList) { }


  ngOnDestroy(): void {
    this.sub.unsubscribe()
    }


  
  ngOnInit() {
    this.ingredients = this.shoppingListSerivce.ingredients 
    this.sub = this.shoppingListSerivce.ingredientAdded.subscribe(
      (ingredient: any) => {
        if (ingredient.constructor != Array) {
          this.shoppingListSerivce.addIngredient(ingredient);
          this.ingredients = this.shoppingListSerivce.ingredients
        }
        else {
          this.shoppingListSerivce.ingredients = []
          this.ingredients = ingredient
        }
        
    }
  )

  this.subForRemoved = this.shoppingListSerivce.deleteShoppingIngredients.subscribe(
  (value) => {

  },
  (err) => {

  },
  () => {
    this.ToggleDirective.deleteIngredients()
  })
  }



  /*
    You click on the link and you receive the active class. You click on it again, you don't receive the active class.
    So basically, you toggle between classes. How to toggle between classes in bootstrap. After that, when you press
    'delete' you want to delete all the anchor tags with the class of active. Now, you want to pass all the links with
    the anchor tags with the class of active and pass them down to shoppingListEdit. How can we do that? We can 
  */
  

  /*
    There's some complicated 7rkat here. We want to only subscribe ONCE, and so it's done by ngOnInIt.
    Notice how it only console.logs once, even if we add an ingredient. Wee just subscribe once and boom, we can add ingredients
    however we want.

  */
}
