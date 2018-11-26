import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/customers/login/login.component';
import { RegisterComponent } from './components/customers/register/register.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { CheckoutComponent } from './components/orders/checkout/checkout.component';
import { CartComponent } from './components/orders/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { OrderComponent } from './components/orders/order/order.component';
import { CartItemComponent } from './components/orders/cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';
=======
import { ConfirmComponent } from './components/customers/confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './components/customers/home/home.component';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
>>>>>>> 12370b3a596252b2c61e9aa7e3d8fae03d9fa0ea

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    CheckoutComponent,
    CartComponent,
<<<<<<< HEAD
    OrderComponent,
    CartItemComponent
  ],
  imports: [BrowserModule, NgbModule, 
    HttpClientModule, AppRoutingModule, 
    FormsModule],
  providers: [],
=======
    ConfirmComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),

    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],

>>>>>>> 12370b3a596252b2c61e9aa7e3d8fae03d9fa0ea
  bootstrap: [AppComponent]
})
export class AppModule {}
