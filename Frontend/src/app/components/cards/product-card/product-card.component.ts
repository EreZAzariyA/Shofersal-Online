import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import AddedItemModel from 'src/app/models/item-to-add-model';
import { CartItemDetails } from 'src/app/models/cart-item-details';
import CustomerModel from 'src/app/models/customer-model';
import ProductModel from 'src/app/models/product-model';
import { AuthState } from 'src/app/redux/auth-state';
import { addItemToShoppingCartAction, removeItemFromCartAction, ShoppingCartState } from 'src/app/redux/shopping-cart-state';
import { authStore, shoppingCartStore } from 'src/app/redux/store';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { environment } from 'src/environments/environment';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import ItemToAddModel from 'src/app/models/item-to-add-model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input()
  public product: ProductModel;
  public imageSource = environment.urls.products.productsImagesUrl;

  public customer: CustomerModel;
  public itemsInCart: CartItemDetails[];
  public stock: number;
  private unsubscribe: Unsubscribe;
  private unsubscribeMeTo: Unsubscribe;

  constructor(public dialog: MatDialog, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.customer = authStore.getState().customer;
    this.itemsInCart = shoppingCartStore.getState().itemsInCart;

    this.stock = this.itemsInCart?.find(i => i.productId === this.product.productId)?.stock;



    this.unsubscribe = authStore.subscribe(() => {
      this.customer = authStore.getState().customer;
    })

    this.unsubscribeMeTo = shoppingCartStore.subscribe(() => {
      this.itemsInCart = shoppingCartStore.getState().itemsInCart;

      this.stock = this.itemsInCart?.find(i => i.productId === this.product.productId)?.stock;


    })
  }

  public async openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, { data: this.stock });

    dialogRef.afterClosed().subscribe(async result => {

      if (result) {

        this.stock = result

        const itemToAddTheState = new CartItemDetails();
        itemToAddTheState.categoryId = this.product.categoryId;
        itemToAddTheState.pictureName = this.product.pictureName;
        itemToAddTheState.price = this.product.price;
        itemToAddTheState.productId = this.product.productId;
        itemToAddTheState.productName = this.product.productName;
        itemToAddTheState.shoppingCartId = shoppingCartStore.getState().shoppingCart.shoppingCartId;
        itemToAddTheState.stock = result;

        const itemToAddTheServer = new AddedItemModel();
        itemToAddTheServer.productId = this.product.productId;
        itemToAddTheServer.shoppingCartId = shoppingCartStore.getState().shoppingCart.shoppingCartId;
        itemToAddTheServer.stock = result;
        shoppingCartStore.dispatch(addItemToShoppingCartAction(itemToAddTheState));
        this.shoppingCartService.addItemToShoppingCart(itemToAddTheServer);

      }
      if (result === 0) {
        shoppingCartStore.dispatch(removeItemFromCartAction(this.product.productId));
        await this.shoppingCartService.removeItemFromCart(this.product.productId, shoppingCartStore.getState().shoppingCart.shoppingCartId);

      }

      if (result > this.stock) {
        console.log("updated...");

      }

    })
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    this.unsubscribeMeTo();
  }
}
