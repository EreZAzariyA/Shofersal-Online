import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetails } from 'src/app/models/cart-item-details';
import { CityModel } from 'src/app/models/city-model';
import { OrderModel } from 'src/app/models/order-model';
import { makeOrderAction, ShoppingCartState } from 'src/app/redux/shopping-cart-state';
import { shoppingCartStore } from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  public imageSource = environment.urls.products.productsImagesUrl
  public itemsInCart: CartItemDetails[];
  public totalPrice: any;
  public cities: CityModel[];
  public order = new OrderModel();

  constructor(private productService: ProductsService, private shoppingCartService: ShoppingCartService, private router: Router, private shoppingCartState: ShoppingCartState) { }

  public async ngOnInit() {
    this.order.shoppingCartId = shoppingCartStore.getState().shoppingCart.shoppingCartId;

    this.itemsInCart = shoppingCartStore.getState().itemsInCart;
    this.cities = await this.productService.getAllCities();
    if (this.itemsInCart) {

      const sum: number[] = [];
      this.itemsInCart?.forEach(item => {
        const g = item.price * item.stock;
        sum.push(g);
      });


      if (sum.length === 0) {
        return;
      }
      this.totalPrice = sum?.reduce((a, b) => a + b).toFixed(2);
      this.order.totalPrice = this.totalPrice;

    }


    
  }

  public async makeOrder(): Promise<void> {
    try {
      const order = await this.shoppingCartService.makeOrder(this.order);
      shoppingCartStore.dispatch(makeOrderAction(order));
      console.log(order);
      alert("Order has been sent");
      this.router.navigateByUrl("/home");
    } catch (err: any) {
      alert(err);
    }

  }



}
