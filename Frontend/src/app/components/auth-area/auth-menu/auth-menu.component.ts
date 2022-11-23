import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import CustomerModel from 'src/app/models/customer-model';
import { AuthState } from 'src/app/redux/auth-state';
import { authStore } from 'src/app/redux/store';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit,OnDestroy {

  @Input()
  public customer: CustomerModel;
  public unsubscribe: Unsubscribe;

  constructor(private authState:AuthState) { }

  public async ngOnInit(){
    this.customer = this.authState.customer;

    this.unsubscribe = authStore.subscribe(() => {
      this.customer = authStore.getState().customer;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
