import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ShoppingList } from '../services/shoppinglist.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements DoCheck {
  clickedOn: boolean
  constructor(private recipeService: RecipeService, private shoppingList: ShoppingList, 
    private route: ActivatedRoute) { }
  ngDoCheck(): void {
    this.clickedOn = this.recipeService.clickedOn
  }
 

  recipeClicked() {

  }


}
