import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import CategoryModel from '../models/category-model';
import { CityModel } from '../models/city-model';
import ProductModel from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urls = environment.urls;

  constructor(private http: HttpClient) { }
  
  public async getAllProducts(): Promise<ProductModel[]>{
    return firstValueFrom(this.http.get<ProductModel[]>(this.urls.products.allProductsUrl));
  };

  public async getAllCategories(): Promise<CategoryModel[]>{
    return firstValueFrom(this.http.get<CategoryModel[]>(this.urls.products.allCategoriesUrl));
  };

  public async getProductsByCategoryId(categoryId: number) {
    return firstValueFrom(this.http.get<ProductModel[]>(this.urls.products.allProductsByCategoryIdUrl + categoryId));
  };

  public async getAllCities(): Promise<CityModel[]>{
    return firstValueFrom(this.http.get<CityModel[]>(this.urls.cities.citiesUrl));
  }
}
