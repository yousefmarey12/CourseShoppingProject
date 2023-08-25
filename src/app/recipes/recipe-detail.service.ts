import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";
import { RecipeService } from "../services/recipe.service";



// This is a guard using resolve.
@Injectable()
export class RecipeDetailGuard implements Resolve<Recipe> {
    constructor(private recipeService: RecipeService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
        return this.recipeService.getRecipes()[route.params['id']]
    }
}