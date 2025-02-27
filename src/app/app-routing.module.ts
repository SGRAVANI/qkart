import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authguardGuard } from './router/authguard.guard';
import { ThanksComponent } from './components/thanks/thanks.component';
import { NotFoundError } from 'rxjs';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"checkout",component:CheckoutComponent, canActivate:[authguardGuard]},
  {path:"thanks",component:ThanksComponent},
  {path:"",component:HomeComponent},
  {path:"**",component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
