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
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.api.getRecipes()
      .subscribe(recipes => this.recipes = recipes);
  }
}
