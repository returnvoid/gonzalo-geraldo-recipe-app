import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  private recipes: Recipe[];
  private totalIngredients: number;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.selectedRecipesChanged.subscribe((ingredientsList: any) => { // subscribe to changes in ingredients list
      this.totalIngredients = this.api.getTotalIngredients();
    });
    this.getRecipes();
  }

  getRecipes(): void {
    this.api.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }
}
