import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import CustomerModel from "../models/customer-model";

@Injectable({
      providedIn: "root"
})
export class AuthState {
      public token: string = null;
      public customer: CustomerModel = null;

      constructor() {
            this.token = localStorage.getItem("token");
            if (this.token) {
                  const decodedData = jwtDecode(this.token);
                  this.customer = (decodedData as any).customer;
            }
      }
}

export enum AuthActionType {
      Register = "Register",
      Login = "Login",
      Logout = "Logout"
}

export interface AuthAction {
      type: AuthActionType;
      payload?: string;
}

export function registerAction(token: string): AuthAction {
      return { type: AuthActionType.Register, payload: token };
}
export function loginAction(token: string): AuthAction {
      return { type: AuthActionType.Login, payload: token };
}
export function logoutAction(): AuthAction {
      return { type: AuthActionType.Logout };
}

export function authReducer(currentAuthState: AuthState = new AuthState(), action: AuthAction): AuthState {

      const newAuthState = { ...currentAuthState };

      switch (action.type) {

            case AuthActionType.Register:
                  break;

            case AuthActionType.Login:
                  newAuthState.token = action.payload;
                  const decodedData = jwtDecode(newAuthState.token);
                  newAuthState.customer = (decodedData as any).customer;
                  localStorage.setItem("token", newAuthState.token);
                  break;

            case AuthActionType.Logout:
                  newAuthState.token = null;
                  newAuthState.customer = null;
                  localStorage.removeItem("token");
                  localStorage.removeItem("shoppingCart");
                  localStorage.removeItem("itemsInCart");
                  localStorage.removeItem("orders");
                  break;
      }

      return newAuthState;

}