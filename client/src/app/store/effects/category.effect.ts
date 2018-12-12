import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, ObservableInput, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { QueryService } from 'src/app/services/query.service';
import {
  LoadCategoriesFail,
  LoadCategoriesSuccess,
  LOAD_CATEGORIES
} from '../actions/category.action';
import { ProductState } from '../reducers/product.reducer';
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
