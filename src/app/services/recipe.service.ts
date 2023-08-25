import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model"; 
import { Ingredient } from "../shared/ingredient.model";


export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    clickedOn = false

    trueClickedOnStatus() {
      this.clickedOn = true
    }
    falseClickedOnStatus() {
      this.clickedOn = false
    }
    
    
    private recipes: Recipe[] = [
        new Recipe(
          'A Test Recipe',
         'This is simply a test',
          'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
          // I want to add these ingredients to my shopping list
          [
            new Ingredient("Meat", 1), new Ingredient("french fries", 20)
          ]
          ),
        new Recipe(
          'Another Test Recipe'
          , 'This is simply a test blah blah'
          , 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
          // I want to add these ingredients to my shopping list
          [
            new Ingredient("meat", 50), new Ingredient("eggs", 20)
          ])
      ];
      
      getRecipes() {
        return this.recipes.slice()
      }

      /*
        What we want to do is get the array of from each recipe that we will work with. Where do we want to store it?
        In the shoppinglist service. After that, we will make a new method on shoppingList-edit which will extract
        the array of recipes in the shoppinglist service and then it will add it to "ingredients"

        Wrong, cause we need to interact with the recipe component.
      */

        getRecipe(desc: string) {
          const server = this.getRecipes().find(
            s => {
              return s.description === desc;
            }
          );
          return server;
        }

}