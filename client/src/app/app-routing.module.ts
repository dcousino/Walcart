import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/customers/login/login.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  providers: []
})
export class AppRoutingModule {}
