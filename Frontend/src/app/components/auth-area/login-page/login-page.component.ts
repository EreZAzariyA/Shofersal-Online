import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import CredentialsModel from 'src/app/models/credentials-model';
import CustomerModel from 'src/app/models/customer-model';
import ProductModel from 'src/app/models/product-model';
import { AuthState } from 'src/app/redux/auth-state';
import { authStore } from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit,OnDestroy {

  public customer: CustomerModel;
  public products: ProductModel[];
  public credentials = new CredentialsModel();
  private unsubscribe: Unsubscribe;


  constructor(private authService: AuthService,private authState:AuthState) { }

  ngOnInit(): void {
    this.customer = this.authState.customer;

    this.unsubscribe = authStore.subscribe(() => {
      this.customer = authStore.getState().customer;
    });

  }

  public async login() {
    try {
      await this.authService.login(this.credentials);
    } catch (err: any) {
      alert(err.massage)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}
