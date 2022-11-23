import { Injectable } from "@angular/core";
import AddedItemModel from "../models/item-to-add-model";
import { CartItemDetails } from "../models/cart-item-details";
import ShoppingCartModel from "../models/shopping-cart-model";
import { OrderModel } from "../models/order-model";


@Injectable({
      providedIn: "root"
})
export class ShoppingCartState {
      public shoppingCart: ShoppingCartModel = null;
      public itemsInCart: CartItemDetails[] = null;
      public orders: OrderModel[] = null;

      constructor() {
            const shoppingCart = localStorage.getItem("shoppingCart");
            if (shoppingCart) {
                  this.shoppingCart = JSON.parse(shoppingCart);

                  const itemsInCart = localStorage.getItem("itemsInCart");
                  if (itemsInCart) {
                        this.itemsInCart = JSON.parse(itemsInCart);
                  }
                  localStorage.setItem("orders", JSON.stringify(this.orders));
            }
      }
}

export enum ShoppingCartActionType {
      FetchShoppingCartAction = "FetchShoppingCartAction",
      FetchItemsFromCartAction = "FetchItemsFromCartAction",
      AddItemToShoppingCartAction = "AddItemToShoppingCartAction",
      RemoveItemFromCartAction = "RemoveItemFromCartAction",
      MakeOrderAction = "MakeOrderAction"
}

export interface ShoppingCartAction {
      type: ShoppingCartActionType;
      payload?: any;
}

export function fetchShoppingCartAction(shoppingCart: ShoppingCartModel): ShoppingCartAction {
      return { type: ShoppingCartActionType.FetchShoppingCartAction, payload: shoppingCart };
}
export function fetchItemsFromCartAction(itemsFromCart: CartItemDetails[]): ShoppingCartAction {
      return { type: ShoppingCartActionType.FetchItemsFromCartAction, payload: itemsFromCart };
}
export function addItemToShoppingCartAction(itemToAdd: CartItemDetails): ShoppingCartAction {
      return { type: ShoppingCartActionType.AddItemToShoppingCartAction, payload: itemToAdd };
}
export function removeItemFromCartAction(itemIdToRemove: number): ShoppingCartAction {
      return { type: ShoppingCartActionType.RemoveItemFromCartAction, payload: itemIdToRemove };
}
export function makeOrderAction(order: OrderModel): ShoppingCartAction {
      return { type: ShoppingCartActionType.MakeOrderAction, payload: order };
}

export function ShoppingCartReducer(currentCartState: ShoppingCartState = new ShoppingCartState(), action: ShoppingCartAction): ShoppingCartState {
      const shoppingCartState = { ...currentCartState }

      switch (action.type) {

            case ShoppingCartActionType.FetchShoppingCartAction:
                  shoppingCartState.shoppingCart = action.payload;

                  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartState.shoppingCart));
                  break;

            case ShoppingCartActionType.FetchItemsFromCartAction:
                  shoppingCartState.itemsInCart = action.payload;

                  localStorage.setItem("itemsInCart", JSON.stringify(shoppingCartState.itemsInCart));
                  break;

            case ShoppingCartActionType.AddItemToShoppingCartAction:
                  // If the item is in the list:
                  if (shoppingCartState.itemsInCart.find(i => i.productId === action.payload.productId)) {
                        //Delete the item from the store:
                        shoppingCartState.itemsInCart = shoppingCartState.itemsInCart.filter(i => i.productId !== action.payload.productId);
                        //Add the item again with the updated stock
                        shoppingCartState.itemsInCart.push(action.payload);
                        localStorage.setItem("itemsInCart", JSON.stringify(shoppingCartState.itemsInCart));
                  } else if (!shoppingCartState.itemsInCart.find(i => i.productId === action.payload.productId)) {
                        //Add the item:
                        shoppingCartState.itemsInCart.push(action.payload);
                        localStorage.setItem("itemsInCart", JSON.stringify(shoppingCartState.itemsInCart));
                  }
                  break;

            case ShoppingCartActionType.RemoveItemFromCartAction:
                  const newListOfItems = shoppingCartState.itemsInCart.filter(i => i.productId !== action.payload);
                  shoppingCartState.itemsInCart = newListOfItems;
                  localStorage.setItem("itemsInCart", JSON.stringify(newListOfItems));
                  break;

            case ShoppingCartActionType.MakeOrderAction:
                  shoppingCartState.itemsInCart = [];
                  localStorage.setItem("itemsInCart", JSON.stringify(shoppingCartState.itemsInCart));

                  shoppingCartState.orders.push(action.payload);
                  localStorage.setItem("orders", JSON.stringify(shoppingCartState.orders));
                  break;

      }


      return shoppingCartState;

}