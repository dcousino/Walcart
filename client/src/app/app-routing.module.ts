import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/customers/login/login.component';
import { ConfirmComponent } from './components/customers/confirm/confirm.component';
import { RegisterComponent } from './components/customers/register/register.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './components/orders/cart/cart.component';
import { HomeComponent } from './components/customers/home/home.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoriesComponent
  },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
