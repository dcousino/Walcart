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
import { ConfirmComponent } from './components/customers/confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import {
  StoreModule,
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { reducers, effects, CustomSerializer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { isDevMode } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './components/customers/home/home.component';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    CheckoutComponent,
    CartComponent,
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

    isDevMode() ? StoreDevtoolsModule.instrument() : []
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
