import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { RecipeService } from "./recipe.service";
import { Subject } from "rxjs";


@Injectable()
export class ShoppingList {


  // We will use the recipeService (see below if needed)
  constructor(private recipeService: RecipeService) {}

  // Default set of ingredients that are to be ordered when you open the page
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      ingredientsToDelete: Ingredient[] = [
        
      ]

  
      ingredientAdded = new Subject<Ingredient[] | Ingredient>();
      deleteShoppingIngredients = new Subject<String>()

    // we use this method to add ingredients to the defualt ingredients array
      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
      }


   
}