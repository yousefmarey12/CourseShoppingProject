import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, ElementRef, ViewChildren, DoCheck, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingList } from '../services/shoppinglist.service';
import { ToggleActiveClassDirective } from '../toggle-active-class.directive';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy, DoCheck, AfterViewChecked {
  // In order to access our directive in our template
  @ViewChildren(ToggleActiveClassDirective) ToggleDirective: ToggleActiveClassDirective[];
  // The ingredients that are to be displayed
  ingredients: Ingredient[]
  // Whether the button says "Add" or "Update". This is very important
  editMode = false
  // This is how we add ingredients to our list. This is works perfectly fine
  private sub: Subscription
  /* 
    This may have a role in the problem. We subscribe to the observable and we use a method in 
    ToggleDirective to delete selected lists. We're using the same directive, so I am not sure if
    that has anything to do with the problem.
  */
  private subForRemoved: Subscription

  // we inject our shoppingList Service which I will post
  constructor(private shoppingListSerivce: ShoppingList) { }

  // We select an item and we pass it on to the shopping list service.
  onSelectItem(index: number) {
    this.shoppingListSerivce.editIngredient.next(index)
    /*
      VERY IMPORTANT: This binding does not work all the time. When I click delete and there's no active
      class then for some reason, it still turns out to be true even though there are no active classes on each
      item.
    */
    this.editMode = this.ToggleDirective.some((el, index, arr) => {
     return el.checkIfAnyActive()
    })
    console.log(this.editMode)
    // when the bug happens, this turns out to be true
    this.shoppingListSerivce.editMode.next(this.editMode)
   }  


  ngAfterViewChecked(): void {
    /* 
      I am trying to do the same thing as I did in onSelectItem() but it's 
      still giving me true when no links are clicked after I press delete.
    */
    this.editMode = this.ToggleDirective.some((el, index, arr) => {
      return el.checkIfAnyActive()
     })
  }

  ngOnInit() {
    this.ingredients = this.shoppingListSerivce.ingredients 
    // subscribing to the ingredient we get and adding it.
    this.sub = this.shoppingListSerivce.ingredientAdded.subscribe(
      (ingredient: any) => {
        if (ingredient.constructor != Array) {  
          this.shoppingListSerivce.addIngredient(ingredient);
          this.ingredients = this.shoppingListSerivce.ingredients
        }
        else {
          // this is jus resetting the ingredients
          this.shoppingListSerivce.ingredients = []
          this.ingredients = ingredient
        }
        
    }
  )

  // we subscribe to the Subject where we capture each element with the ToggleDierctive and we delete it
  this.subForRemoved = this.shoppingListSerivce.deleteShoppingIngredients.subscribe(
    // We don't really need the value
  (value) => {
    this.ToggleDirective.forEach(el => el.deleteItem())
  })
  }

  // unsubscribing to observables to avoid memory leaks
  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.subForRemoved.unsubscribe()
    }

  

  // making sure that ingredients defined above is always the same as the ingredients in the shopping service
  ngDoCheck() {
    this.ingredients = this.shoppingListSerivce.ingredients
    
  }



  /*
    How about we check whether each of the ingredients have an active class. If only one has an active class, then we add
    the update. Otherwise, it will be add. We will check after every ViewChecked
  */

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
