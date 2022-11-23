import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemDetails } from 'src/app/models/cart-item-details';
import CustomerModel from 'src/app/models/customer-model';
import ShoppingCartModel from 'src/app/models/shopping-cart-model';
import { AuthState } from 'src/app/redux/auth-state';
import { ShoppingCartState } from 'src/app/redux/shopping-cart-state';
import { authStore, shoppingCartStore } from 'src/app/redux/store';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {

  public customer: CustomerModel;
  public shoppingCart: ShoppingCartModel;
  public itemsInCart: CartItemDetails[];
  public totalPrice: any;
  private unsubscribe: Unsubscribe;
  private unsubscribeMeTo: Unsubscribe;

  constructor(private authState: AuthState, private shoppingCartState: ShoppingCartState) { }

  ngOnInit(): void {
    this.customer = this.authState.customer;
    this.shoppingCart = this.shoppingCartState.shoppingCart;
    this.itemsInCart = shoppingCartStore.getState().itemsInCart;

    if (this.itemsInCart) {
      const sum: number[] = [];
      this.itemsInCart?.forEach(item => {
        const totalPrice = item.price * item.stock;
        sum.push(totalPrice);
      });


      if (sum.length === 0) {
        return;
      }
      this.totalPrice = sum?.reduce((a, b) => a + b).toFixed(2);

    }

    this.unsubscribe = authStore.subscribe(() => {
      this.customer = authStore.getState().customer;
    });

    this.unsubscribeMeTo = shoppingCartStore.subscribe(() => {
      this.shoppingCart = shoppingCartStore.getState().shoppingCart;
      this.itemsInCart = shoppingCartStore.getState().itemsInCart;

      if (this.itemsInCart) {
        const sum: number[] = [];
        this.itemsInCart?.forEach(item => {
          const totalPrice = item.price * item.stock;
          sum.push(totalPrice);
        });


        if (sum.length === 0) {
          return;
        }
        this.totalPrice = sum?.reduce((a, b) => a + b).toFixed(2);

      }
    })
  }




  ngOnDestroy(): void {
    this.unsubscribe();
    this.unsubscribeMeTo();
  }
}
