import { Component, OnInit } from '@angular/core';
import CategoryModel from 'src/app/models/category-model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public opened = false;
  public categories: CategoryModel[];


  constructor(private productsService:ProductsService) { }

  public async ngOnInit() {
    this.categories = await this.productsService.getAllCategories();
  }

}
