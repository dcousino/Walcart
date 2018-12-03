import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
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
import { ADD_TO_CART, AddToCart } from '../actions/cart.action';
@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private queryService: QueryService,
    private router: Router,
    private store$: Store<ProductState>
  ) {}

  // @Effect()
  // addtoCart$ = this.actions$.ofType(ADD_TO_CART).pipe(
  //   map((action: AddToCart) => action.payload),
  //   switchMap(categoryId => {
  //     return this.queryService.getFirstProductPage(categoryId).pipe(
  //       map(productPage => new LoadInitialProductPageSuccess(productPage)),
  //       tap(() => this.router.navigate(['/product-page/0'])),
  //       catchError(error => of(new LoadInitialProductPageFail(error)))
  //     );
  //   })
  // );
}
