import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemDetails } from '../models/cart-item-details';
import CustomerModel from '../models/customer-model';
import ItemToAddModel from '../models/item-to-add-model';
import { OrderModel } from '../models/order-model';
import ShoppingCartModel from '../models/shopping-cart-model';
import { addItemToShoppingCartAction, fetchItemsFromCartAction, fetchShoppingCartAction } from '../redux/shopping-cart-state';
import { shoppingCartStore } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private urls = environment.urls.shoppingCart;

  constructor(public http: HttpClient) { }

  public async getShoppingCartByCustomerId(customerId: number): Promise<ShoppingCartModel> {
    const shoppingCart = await firstValueFrom(this.http.get<ShoppingCartModel>(this.urls.shoppingCartByCustomerId + customerId));
    shoppingCartStore.dispatch(fetchShoppingCartAction(shoppingCart));
    return shoppingCart;
  }

  public async getAllItemsInCartByShoppingCartId(shoppingCartId: number): Promise<CartItemDetails[]> {
    const itemsInCart = await firstValueFrom(this.http.get<CartItemDetails[]>(this.urls.getAllItemsInCartByShoppingCartIdUrl + shoppingCartId));
    shoppingCartStore.dispatch(fetchItemsFromCartAction(itemsInCart));
    return itemsInCart;
  }

  public async createNewShoppingCart(customer: CustomerModel): Promise<ShoppingCartModel> {
    const shoppingCart = await firstValueFrom(this.http.post<ShoppingCartModel>(this.urls.createNewCartUrl, customer));
    shoppingCartStore.dispatch(fetchShoppingCartAction(shoppingCart));
    return shoppingCart;
  };

  public async addItemToShoppingCart(itemToAdd:ItemToAddModel){
    return await firstValueFrom(this.http.post<ItemToAddModel>(this.urls.addItemToCartUrl, itemToAdd));
  }

  public async updateStock(itemToUpdate: ItemToAddModel): Promise<ItemToAddModel> {
    return await firstValueFrom(this.http.patch<ItemToAddModel>(this.urls.updateStockInCartUrl, itemToUpdate));
  }

  public async removeItemFromCart(itemIdToRemove: number, shoppingCartId: number) {
    return await firstValueFrom(this.http.delete<ItemToAddModel>(this.urls.removeItemFromCartUrl + itemIdToRemove + "/" + shoppingCartId));
  }

  public async makeOrder(order: OrderModel): Promise<OrderModel> {
    return await firstValueFrom(this.http.post<OrderModel>(this.urls.makeOrder, order));

  }

}
