import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingList } from 'src/app/services/shoppinglist.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  duplicateFound = false
  ingredientsAdded = []


  constructor(private shoppingListService: ShoppingList, private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) { }
  ngOnDestroy(): void {
    this.recipeService.falseClickedOnStatus()
  }

  ngOnInit() {
  this.route.data.subscribe(
      (data: Data) => this.recipe = data['detail']
  )
    this.recipeService.trueClickedOnStatus()
  }



  addItems() {
      this.shoppingListService.addIngredients(this.recipe.ingredients)
  }

  navigateToEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
