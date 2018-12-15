import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { ErrorModalComponent } from 'src/app/components/alerts/error-modal/error-modal.component';
import { Order } from 'src/app/models/order';
import { UserService } from 'src/app/services/user/user.service';
import {
  CreateOrder,
  CreateOrderFail,
  CreateOrderHistory,
  CreateOrderHistoryFail,
  CreateOrderHistorySuccess,
  CreateOrderSuccess,
  CREATE_ORDER,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_HISTORY,
  CREATE_ORDER_SUCCESS,
  LoadOrderHistory
} from '../actions/order.action';
import {
  CreateOrLoadUserSuccess,
  CREATE_OR_LOAD_USER_SUCCESS
} from '../actions/user.action';
import { CartState } from '../reducers/cart.reducer';
import { UserState } from '../reducers/user.reducer';
import { getUserState } from '../selectors';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private userSvc: UserService,
    private store$: Store<CartState>,
    private modalService: NgbModal,
    private router: Router
  ) {}

  @Effect()
  createOrder$ = this.actions$.ofType(CREATE_ORDER).pipe(
    map((action: CreateOrder) => action.payload),
    withLatestFrom(this.store$.select(getUserState)),
    map(([order, state]: [Order, UserState]) => {
      return {
        ...state.user,
        currentOrder: order
      };
    }),
    switchMap(user => {
      return this.userSvc.update(user).pipe(
        map(() => new CreateOrderSuccess()),
        catchError(error => of(new CreateOrderFail(error)))
      );
    })
  );

  @Effect()
  updateOrderHistory$ = this.actions$.ofType(CREATE_ORDER_HISTORY).pipe(
    map((action: CreateOrderHistory) => action.payload),
    withLatestFrom(this.store$.select(getUserState)),
    map(([order, state]: [Order, UserState]) => {
      return {
        ...state.user,
        currentOrder: order
      };
    }),
    switchMap(user => {
      return this.userSvc.update(user).pipe(
        map(() => new CreateOrderHistorySuccess()),
        catchError(error => of(new CreateOrderHistoryFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  createOrderErrorModal$ = this.actions$.ofType(CREATE_ORDER_FAIL).pipe(
    map((action: CreateOrderFail) => action.payload),
    tap(error => {
      const modalRef = this.modalService.open(ErrorModalComponent);
      modalRef.componentInstance.errorMessage = error.message;
    })
  );

  @Effect({ dispatch: false })
  createOrderSuccess$ = this.actions$.ofType(CREATE_ORDER_SUCCESS).pipe(
    tap(() => {
      this.router.navigate(['/checkout']);
    })
  );
  @Effect()
  loadCartFromDB$ = this.actions$.ofType(CREATE_OR_LOAD_USER_SUCCESS).pipe(
    map((action: CreateOrLoadUserSuccess) => action.payload),
    switchMap(user => of(new LoadOrderHistory(user.orderHistory)))
  );
}
