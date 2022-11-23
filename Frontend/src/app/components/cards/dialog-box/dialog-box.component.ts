import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCartState } from 'src/app/redux/shopping-cart-state';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  public stock: number = 0;

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private shoppingCartState: ShoppingCartState) { }

  ngOnInit(): void {
    if (this.data) {
      
      this.stock = this.data;
    }
    
    
  }

  public async plus() {
    this.stock = this.stock + 1;
  }

  public async minus() {
    this.stock = this.stock - 1;
  }
  
  

}
