import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
  LOAD_CATEGORIES,
  LoadCategoriesSuccess,
  LoadCategoriesFail
} from '../actions/category.action';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { of, Observable, ObservableInput } from 'rxjs';
import { QueryService } from 'src/app/services/query.service';
import { Store } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import { Category } from 'src/app/models/category';
import { getCategories } from '../reducers/category.reducter';
import { getCategoryState } from '../selectors';

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
        return this.triggerLoadSuccess(categories);
      }
      return this.queryService.getMainCategories().pipe(
        map(categories => new LoadCategoriesSuccess(categories)),
        catchError(error => of(new LoadCategoriesFail(error)))
      );
    })
  );

  private triggerLoadSuccess(categories: Category[]): ObservableInput<{}> {
    return Observable.create(observer => {
      observer.next(new LoadCategoriesSuccess(categories));
      observer.complete();
    });
  }
}
