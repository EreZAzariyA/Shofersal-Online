import express, { NextFunction, Request, Response } from "express";
import path from "path";
import productsLogic from "../05-BLL/products-logic";

const router = express.Router();

//Get all products:
//http://localhost:3001/api/all-products:
router.get("/all-products", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const products = await productsLogic.getAllProducts();
            res.json(products);
      } catch (err: any) {
            next(err);
      }
});

//Get all categories:
//http://localhost:3001/api/all-categories:
router.get("/all-categories", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const categories = await productsLogic.getAllCategories();
            res.json(categories);
      } catch (err: any) {
            next(err);
      }
});

//Get products by category id:
//http://localhost:3001/api/products-by-categoryId:
router.get("/products-by-category/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const categoryId = +req.params.categoryId;
            const productsByCategoryId = await productsLogic.getProductsByCategoryId(categoryId);
            res.json(productsByCategoryId);
      } catch (err: any) {
            next(err);
      }
});

//Get all images:
router.get("/images/:pictureName", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const pictureName = req.params.pictureName;
            const absolutePath = path.join(__dirname, "..", "Assets", "Images", "products-images", pictureName);
            res.sendFile(absolutePath);
      } catch (err: any) {
            next(err);
      }
});



export default router;