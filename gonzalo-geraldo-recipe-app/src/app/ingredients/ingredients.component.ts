import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from '../ingredient';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.sass']
})
export class IngredientsComponent implements OnInit {
  private ingredients: Ingredient[];
  private sortBy: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.ingredients = [];
    this.sortBy = this.api.getSortBy();
    this.api.selectedRecipesChanged.subscribe((ingredientsList: any) => { // subscribe to changes in ingredients list
      this.ingredients = ingredientsList;
      this.sortArray();
    });
  }

  sortChanged() {
    this.api.sortEmit();
    this.sortBy = this.api.getSortBy();
    this.sortArray();
  }

  sortArray() {
    this.ingredients = this.api.getSortBy().dir === 'ASC' ? this.ingredients.sort() : this.ingredients.sort().reverse();
  }

}
