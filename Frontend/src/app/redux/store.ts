import { createStore } from "redux";
import { authReducer } from "./auth-state";
import { ShoppingCartReducer } from "./shopping-cart-state";

export const authStore = createStore(authReducer);
export const shoppingCartStore= createStore(ShoppingCartReducer);