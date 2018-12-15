import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { UserService } from 'src/app/services/user/user.service';
import {
  LoadCart,
  SaveCartFail,
  SaveCartSuccess,
  SAVE_CART
} from '../actions/cart.action';
import {
  CreateOrLoadUserSuccess,
  CREATE_OR_LOAD_USER_SUCCESS
} from '../actions/user.action';
import { CartState } from '../reducers/cart.reducer';
import { UserState } from '../reducers/user.reducer';
import { getCartState, getUserState } from '../selectors';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private userSvc: UserService,
    private store$: Store<CartState>
  ) {}

  @Effect()
  saveCart$ = this.actions$.ofType(SAVE_CART).pipe(
    withLatestFrom(this.store$.select(getCartState)),
    map(([_, state]: [Action, CartState]) => state.cart),
    withLatestFrom(this.store$.select(getUserState)),
    map(([cartItems, state]: [CartItem[], UserState]) => {
      return {
        ...state.user,
        cart: cartItems
      };
    }),
    switchMap(user => {
      return this.userSvc.update(user).pipe(
        map(() => new SaveCartSuccess()),
        catchError(error => of(new SaveCartFail(error)))
      );
    })
  );

  @Effect()
  loadCartFromDB$ = this.actions$.ofType(CREATE_OR_LOAD_USER_SUCCESS).pipe(
    map((action: CreateOrLoadUserSuccess) => action.payload),
    switchMap(user => of(new LoadCart(user.cart)))
  );
}
