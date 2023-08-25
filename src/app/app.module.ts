import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingList } from './services/shoppinglist.service';
import { RecipeService } from './services/recipe.service';
import { AppRouteModule } from './App-Route.module';
import { RecipeDetailGuard } from './recipes/recipe-detail.service';
import { RecipiesEditComponent } from './recipies/recipies-edit/recipies-edit.component';
import { ToggleActiveClassDirective } from './toggle-active-class.directive';
import { DeleteDirective } from './delete.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipiesEditComponent,
    ToggleActiveClassDirective,
    DeleteDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouteModule
  ],
  providers: [RecipeService, ShoppingList, RecipeDetailGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
