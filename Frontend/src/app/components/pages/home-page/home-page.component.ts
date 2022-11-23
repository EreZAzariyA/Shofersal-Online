import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public products: ProductModel[];

  constructor(private productsService:ProductsService) { }

  public async ngOnInit(){
    this.products = await this.productsService.getAllProducts();
  }

}
