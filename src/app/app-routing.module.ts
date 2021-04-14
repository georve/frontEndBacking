import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { HomeComponent} from './home/home.component';
import { RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import  { DepositComponent} from './deposit/deposit.component';
import  { WithdrawalComponent} from './withdrawal/withdrawal.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'Deposit',
    component: DepositComponent,
  },
  {
    path: 'Widrawals',
    component: WithdrawalComponent,
  },
];;


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
