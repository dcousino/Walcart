import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  tap
} from 'rxjs/operators';
import { Order } from 'src/app/models/order';
import { UserService } from 'src/app/services/user/user.service';
import {
  CreateOrder,
  CreateOrderFail,
  CreateOrderSuccess,
  CREATE_ORDER,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS
} from '../actions/order.action';
import { CartState } from '../reducers/cart.reducer';
import { UserState } from '../reducers/user.reducer';
import { getUserState } from '../selectors';
import { ErrorModalComponent } from 'src/app/components/alerts/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
}
