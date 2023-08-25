import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { NgModule } from "@angular/core";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeDetailGuard } from "./recipes/recipe-detail.service";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipiesEditComponent } from "./recipies/recipies-edit/recipies-edit.component";

const appRoutes: Routes = [
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {path: 'new', component: RecipiesEditComponent},
            {path: ':id', component: RecipeDetailComponent, resolve: {detail: RecipeDetailGuard}},
            {path: ':id/edit', component: RecipiesEditComponent}
        ]
    },
    {
        path: 'shoppinglist',
        component: ShoppingListComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],

    // Now, let's talk about exportds
    exports: [RouterModule]
})
export class AppRouteModule {

}