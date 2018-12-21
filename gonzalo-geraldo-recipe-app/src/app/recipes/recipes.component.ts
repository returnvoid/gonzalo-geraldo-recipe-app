import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { ApiService } from '../api.service';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass']
})
export class RecipesComponent implements OnInit {
  @Input() recipes: Recipe[];
  private ingredients: Ingredient[];
  private sortBy: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.sortBy = this.api.getSortBy();
    this.api.sortChanged.subscribe((sortBy: any) => {
      this.sortBy = sortBy;
      this.ingredients = this.sortIngredientsArray();
    });
  }

  onSelection($event: any) {
    this.ingredients = [];
    $event.source.selectedOptions.selected.map((recipe: any) => {
      recipe.value.ingredients.map((ingredient: any) => {
        this.ingredients.push(ingredient); // add ingredients for selected recipes
      });
    });
    // call service to emit changes when recipes are selected
    this.ingredients = this.sortIngredientsArray();
    this.api.recipesSelectedEmit(this.ingredients);
  }

  sortIngredientsArray(): Ingredient[] {// remove duplicated ingredients
    let ingredients: Ingredient[];
    ingredients = this.ingredients.filter((ingredient, position) => this.ingredients.indexOf(ingredient) === position);
    return ingredients;
  }

}
