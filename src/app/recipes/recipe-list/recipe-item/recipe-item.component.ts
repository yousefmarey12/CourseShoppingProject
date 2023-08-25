import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingList } from 'src/app/services/shoppinglist.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeDetailGuard } from '../../recipe-detail.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  id: string

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
  for (let i = 0; i < this.recipeService.getRecipes().length; i++) {
    if (this.recipeService.getRecipes()[i].description == this.recipe.description) {
      this.id = i.toString()
  }
  }
  
  }
}
