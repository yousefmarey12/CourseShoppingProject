import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { RecipeService } from "./recipe.service";
import { Subject } from "rxjs";


@Injectable()
export class ShoppingList {

      // Default set of ingredients that are to be ordered when you open the page
      ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      // We use this whenever we want to add ingredient/s.
      ingredientAdded = new Subject<Ingredient[] | Ingredient>();

      // Whenever we want to delete the ingredient
      deleteShoppingIngredients = new Subject<String>()

      // when we want to edit an ingredient
      editIngredient = new Subject<number>()

      // whether we can edit ingredients
      editMode = new Subject<boolean>()

      getIngredient(index: number) {
        return this.ingredients[index]
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
      }

      // We update a particular ingredient using the index with a new ingredient we pass on
      updateIngredient(index: number, ing: Ingredient) {
        this.ingredients[index] = ing
      }


   
}