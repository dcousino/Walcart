import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {
  NgbModalModule,
  NgbRatingModule,
  NgbTabsetModule,
  NgbAccordionModule
} from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { GravatarModule } from 'ngx-gravatar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorModalComponent } from './components/alerts/error-modal/error-modal.component';
import { ConfirmComponent } from './components/customers/confirm/confirm.component';
import { HomeComponent } from './components/customers/home/home.component';
import { LoginComponent } from './components/customers/login/login.component';
import { AddressDetailsComponent } from './components/customers/profile/address-details/address-details.component';
import { BasicInfoComponent } from './components/customers/profile/basic-info/basic-info.component';
import { ProfileComponent } from './components/customers/profile/profile.component';
import { RegisterComponent } from './components/customers/register/register.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SpinnerComponent } from './components/layout/spinner/spinner.component';
import { CartComponent } from './components/orders/cart/cart.component';
import { CheckoutComponent } from './components/orders/checkout/checkout.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ProductCardComponent } from './components/products/product-page/product-card/product-card.component';
import { ProductPageNavComponent } from './components/products/product-page/product-page-nav/product-page-nav.component';
import { ProductPageComponent } from './components/products/product-page/product-page.component';
import { RatingComponent } from './components/products/product-page/rating/rating.component';
import { SubCategoriesComponent } from './components/products/sub-categories/sub-categories.component';
import { effects, reducers } from './store';
import { clearState } from './store/reducers/clearState.metaReducer';
import { AuthService } from './services/auth/auth.service';
import { JWTOptionFactory } from './jwtoption-factory';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth', 'user', 'categories', 'cart'],
    rehydrate: true
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
  clearState
];

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
    HomeComponent,
    SubCategoriesComponent,
    ProductPageComponent,
    ProductPageNavComponent,
    SpinnerComponent,
    ErrorModalComponent,
    RatingComponent,
    ProductCardComponent,
    ProfileComponent,
    AddressDetailsComponent,
    BasicInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModalModule,
    NgbRatingModule,
    NgbTabsetModule,
    ReactiveFormsModule,
    GravatarModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    // StoreRouterConnectingModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: new JWTOptionFactory().getOptions
      }
    }),
    NgbAccordionModule.forRoot()
  ],
  entryComponents: [ErrorModalComponent, AddressDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
