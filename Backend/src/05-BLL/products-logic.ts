import CategoryModel from "../03-Models/category-model";
import { CityModel } from "../03-Models/city-model";
import ProductModel from "../03-Models/product-model";
import dal from "../04-DAL/dal";


async function getAllProducts(): Promise<ProductModel[]>{
      const sql = "SELECT * FROM products";
      const products = await dal.execute(sql);
      return products;
}

async function getAllCategories(): Promise<CategoryModel[]>{
      const sql = "SELECT * FROM categories";
      const categories = await dal.execute(sql);
      return categories;
}

async function getProductsByCategoryId(categoryId: number): Promise<ProductModel[]>{
      const sql = "SELECT * FROM products WHERE categoryId =" + categoryId;
      const products = await dal.execute(sql);
      return products;
}

async function allCities(): Promise<CityModel[]>{
      const sql = "SELECT * FROM cities";
      const cities = await dal.execute(sql);
      return cities
}



export default {
      getAllProducts,
      getAllCategories,
      getProductsByCategoryId,
      allCities
}