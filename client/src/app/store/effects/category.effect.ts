import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
  LOAD_CATEGORIES,
  LoadCategoriesSuccess,
  LoadCategoriesFail,
  SET_CURRENT_CATEGORY,
  SetCurrentCategory
} from '../actions/category.action';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import { QueryService } from 'src/app/services/query.service';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private queryService: QueryService) {}

  @Effect()
  loadCategories$ = this.actions$.ofType(LOAD_CATEGORIES).pipe(
    switchMap(() => {
      return this.queryService.getMainCategories().pipe(
        map(categories => new LoadCategoriesSuccess(categories)),
        catchError(error => of(new LoadCategoriesFail(error)))
      );
    })
  );
}
