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
import { OrderComponent } from './components/orders/order/order.component';
import { CartItemComponent } from './components/orders/cart-item/cart-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CategoriesComponent,
    CheckoutComponent,
    CartComponent,
    OrderComponent,
    CartItemComponent
  ],
  imports: [BrowserModule, NgbModule, 
    HttpClientModule, AppRoutingModule, 
    FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
