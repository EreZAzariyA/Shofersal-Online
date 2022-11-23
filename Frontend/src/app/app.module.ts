import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './components/layout-area/side-nav/side-nav.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProductCardComponent } from './components/cards/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { LegumesPageComponent } from './components/pages/categories/legumes-page/legumes-page.component';
import { DrinksPageComponent } from './components/pages/categories/drinks-page/drinks-page.component';
import { CosmeticsPageComponent } from './components/pages/categories/cosmetics-page/cosmetics-page.component';
import { ElectricsPageComponent } from './components/pages/categories/electrics-page/electrics-page.component';
import { CleaningsPageComponent } from './components/pages/categories/cleanings-page/cleanings-page.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { LoginPageComponent } from './components/auth-area/login-page/login-page.component';
import { LogoutPageComponent } from './components/auth-area/logout-page/logout-page.component';
import { RegisterPageComponent } from './components/auth-area/register-page/register-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { DialogBoxComponent } from './components/cards/dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderPageComponent } from './components/pages/order-page/order-page.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SideNavComponent,
    HomePageComponent,
    ProductCardComponent,
    LegumesPageComponent,
    DrinksPageComponent,
    CosmeticsPageComponent,
    ElectricsPageComponent,
    CleaningsPageComponent,
    AuthMenuComponent,
    LoginPageComponent,
    LogoutPageComponent,
    RegisterPageComponent,
    DialogBoxComponent,
    OrderPageComponent,

  ],
  entryComponents: [DialogBoxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [{
    useClass: JwtInterceptor, // Register our interceptor class as a global service
    provide: HTTP_INTERCEPTORS, // Tells Angular that this class is an interceptor, thus call it on each request/response
    multi: true // Tells Angular that it can register it many times
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
