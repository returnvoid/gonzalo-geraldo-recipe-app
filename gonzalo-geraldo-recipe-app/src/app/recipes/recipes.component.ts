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
    this.api.sortChanged.subscribe(sortBy => {
      this.sortBy = sortBy;
      console.log('sortChanged:subscribe', this.sortBy);
      this.ingredients = this.sortIngredientsArray();
    });
  }

  onSelection($event) {
    this.ingredients = [];
    $event.source.selectedOptions.selected.map(recipe => {
      recipe.value.ingredients.map(ingredient => {
        this.ingredients.push(ingredient); // add ingredients for selected recipes
      });
    });
    // call service to emit changes when recipes are selected
    this.api.recipesSelectedEmit(this.sortIngredientsArray());
  }

  sortIngredientsArray(): Ingredient[] {
    console.log('sortIngredientsArray', this.api.getSortBy());
    return this.api.getSortBy().dir === 'ASC' ? this.ingredients.sort().reverse() : this.ingredients.sort();
  }

}
