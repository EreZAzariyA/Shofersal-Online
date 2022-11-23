import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemDetails } from '../models/cart-item-details';
import CredentialsModel from '../models/credentials-model';
import CustomerModel from '../models/customer-model';
import ShoppingCartModel from '../models/shopping-cart-model';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import { fetchShoppingCartAction, fetchItemsFromCartAction } from '../redux/shopping-cart-state';
import { authStore, shoppingCartStore } from '../redux/store';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urls = environment.urls;
  private customer: CustomerModel;

  constructor(private http: HttpClient, private shoppingCartServices: ShoppingCartService) { }

  public async register(customer: CustomerModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(this.urls.auth.registerUrl, customer));

    authStore.dispatch(registerAction(token));
    authStore.dispatch(loginAction(token));
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(this.urls.auth.loginUrl, credentials));

    authStore.dispatch(loginAction(token));
    this.onLogin(token);

  }

  public async onLogin(token: string) {
    const decodedData = jwtDecode(token);
    this.customer = (decodedData as any).customer;

    const shoppingCart: ShoppingCartModel = await this.shoppingCartServices.getShoppingCartByCustomerId(this.customer.customerId);

    if (shoppingCart) {
      shoppingCartStore.dispatch(fetchShoppingCartAction(shoppingCart));      

      const itemsInCart: CartItemDetails[] = await this.shoppingCartServices.getAllItemsInCartByShoppingCartId(shoppingCart.shoppingCartId);

      shoppingCartStore.dispatch(fetchItemsFromCartAction(itemsInCart));
    }
  }

  public logout(): void {
    authStore.dispatch(logoutAction());
    alert("Logged-out");
  }
}
