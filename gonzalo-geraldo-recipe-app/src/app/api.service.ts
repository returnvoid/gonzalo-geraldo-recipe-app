import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Ingredient } from './ingredient';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() selectedRecipesChanged: EventEmitter<Ingredient[]> = new EventEmitter();
  @Output() sortChanged: EventEmitter<string> = new EventEmitter();
  private sortBy: any;

  constructor(private http: HttpClient) {
    this.sortBy = this.sortList()[0];
    this.setSortBy();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('assets/json/recipes.json')
      .pipe(
        catchError(this.handleError('getRecipes', []))
      );
  }

  sortList(): any {
    return [{dir: 'ASC', icon: 'arrow_drop_up'}, {dir: 'DESC', icon: 'arrow_drop_down'}];
  }

  getSortBy(): any {
    return this.sortBy;
  }

  setSortBy() {
    this.sortBy = this.sortBy.dir === 'ASC' ? this.sortList()[1] : this.sortList()[0];
  }

  sortEmit() {
    this.setSortBy();
    this.sortChanged.emit(this.sortBy);
  }

  recipesSelectedEmit(ingredients: Ingredient[]) {
    this.selectedRecipesChanged.emit(ingredients);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
