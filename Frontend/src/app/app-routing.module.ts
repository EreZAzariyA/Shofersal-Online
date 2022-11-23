import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/auth-area/login-page/login-page.component';
import { LogoutPageComponent } from './components/auth-area/logout-page/logout-page.component';
import { RegisterPageComponent } from './components/auth-area/register-page/register-page.component';
import { CleaningsPageComponent } from './components/pages/categories/cleanings-page/cleanings-page.component';
import { CosmeticsPageComponent } from './components/pages/categories/cosmetics-page/cosmetics-page.component';
import { DrinksPageComponent } from './components/pages/categories/drinks-page/drinks-page.component';
import { ElectricsPageComponent } from './components/pages/categories/electrics-page/electrics-page.component';
import { LegumesPageComponent } from './components/pages/categories/legumes-page/legumes-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { OrderPageComponent } from './components/pages/order-page/order-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  //Main Routes:
  { path: "home", component: HomePageComponent, canActivate: [AuthGuard] },
  { path: "categories/legumes", component: LegumesPageComponent, canActivate: [AuthGuard] },
  { path: "categories/drinks", component: DrinksPageComponent, canActivate: [AuthGuard] },
  { path: "categories/cleanings", component: CleaningsPageComponent, canActivate: [AuthGuard] },
  { path: "categories/cosmetics", component: CosmeticsPageComponent, canActivate: [AuthGuard] },
  { path: "categories/electrics", component: ElectricsPageComponent, canActivate: [AuthGuard] },
  { path: "make-order", component: OrderPageComponent, canActivate: [AuthGuard] },

  //Auth-Routes:
  { path: "auth/login", component: LoginPageComponent },
  { path: "auth/logout", component: LogoutPageComponent },
  { path: "auth/register", component: RegisterPageComponent },


  { path: "", pathMatch: "full", redirectTo: "auth/login" },
  { path: "**", redirectTo: "auth/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
