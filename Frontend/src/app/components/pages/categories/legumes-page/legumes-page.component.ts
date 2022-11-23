import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CategoryModel from 'src/app/models/category-model';
import ProductModel from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-legumes-page',
  templateUrl: './legumes-page.component.html',
  styleUrls: ['./legumes-page.component.css']
})
export class LegumesPageComponent implements OnInit {

  private thisPath: string;
  public products: ProductModel[];
  public thisCategory: CategoryModel;

  constructor(private activeRouter: ActivatedRoute, private productServices: ProductsService) { }

  public async ngOnInit() {
    //Get the router params:
    this.thisPath = this.activeRouter.snapshot.routeConfig.path.substring(11);
    const categories = await this.productServices.getAllCategories();

    this.thisCategory = categories.find(c => c.category === this.thisPath);

    this.products = await this.productServices.getProductsByCategoryId(this.thisCategory.categoryId);

  }

}
