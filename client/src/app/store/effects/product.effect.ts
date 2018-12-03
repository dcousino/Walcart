import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
  LOAD_INITIAL_PRODUCT_PAGE,
  LoadInitialProductPage,
  LoadInitialProductPageSuccess,
  LoadInitialProductPageFail,
  LOAD_NEXT_PRODUCT_PAGE,
  LoadNextProductPage,
  LoadNextProductPageSuccess,
  LoadNextProductPageFail,
  LOAD_PREVIOUS_PRODUCT_PAGE,
  LoadPreviousPage,
  LoadPreviousPageSuccess,
  LoadPreviousPageFail
} from '../actions/product.action';
import {
  switchMap,
  map,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { of } from 'rxjs';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.service';
import { Store, Action } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private queryService: QueryService,
    private router: Router,
    private store$: Store<ProductState>
  ) {}

  @Effect()
  loadInitialPage$ = this.actions$.ofType(LOAD_INITIAL_PRODUCT_PAGE).pipe(
    map((action: LoadInitialProductPage) => action.payload),
    switchMap(categoryId => {
      return this.queryService.getFirstProductPage(categoryId).pipe(
        map(productPage => new LoadInitialProductPageSuccess(productPage)),
        tap(() => this.router.navigate(['/product-page/0'])),
        catchError(error => of(new LoadInitialProductPageFail(error)))
      );
    })
  );

  @Effect()
  loadNextPage$ = this.actions$.ofType(LOAD_NEXT_PRODUCT_PAGE).pipe(
    map((action: LoadNextProductPage) => action.payload),
    switchMap(paramPath => {
      return this.queryService.getNextProductPage(paramPath).pipe(
        map(productPage => new LoadNextProductPageSuccess(productPage)),
        tap(page => {
          const nextPage = `/product-page/${page.payload.pageNumber}`;
          this.router.navigate([nextPage]);
        }),
        catchError(error => of(new LoadNextProductPageFail(error)))
      );
    })
  );

  @Effect()
  loadPrevious$ = this.actions$.ofType(LOAD_PREVIOUS_PRODUCT_PAGE).pipe(
    withLatestFrom(this.store$.select('products')),
    tap(products => {
      const nextPage = `/product-page/${--products[1].currentPage}`;
      this.router.navigate([nextPage]);
    }),
    withLatestFrom(this.store$.select('products')),
    map(products => {
      return new LoadPreviousPageSuccess(products[1].currentPage);
    }),

    catchError(error => of(new LoadPreviousPageFail(error)))
  );
}
