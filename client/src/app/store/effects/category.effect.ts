import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
  LOAD_CATEGORIES,
  LoadCategoriesSuccess,
  LoadCategoriesFail
} from '../actions/category.action';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  filter,
  take
} from 'rxjs/operators';

import { of, Observable } from 'rxjs';
import { QueryService } from 'src/app/services/query.service';
import { Store } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import { getCategoryState } from '../reducers';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private queryService: QueryService,
    private store$: Store<ProductState>
  ) {}

  @Effect()
  loadCategories$ = this.actions$.ofType(LOAD_CATEGORIES).pipe(
    withLatestFrom(this.store$.select(getCategoryState)),
    map(([action, state]) => state.categories),
    switchMap(categories => {
      // We'll just go off the cache ... this should change too much
      if (categories && categories.length > 0) {
        return Observable.create(observer => {
          observer.next(new LoadCategoriesSuccess(categories));
          observer.complete();
        });
      }
      return this.queryService.getMainCategories().pipe(
        map(categories => new LoadCategoriesSuccess(categories)),
        catchError(error => of(new LoadCategoriesFail(error)))
      );
    })
  );
}
