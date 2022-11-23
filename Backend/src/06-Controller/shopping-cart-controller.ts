import express, { NextFunction, Request, Response } from "express";
import OrderModel from "../03-Models/order-model";
import shoppingCartLogic from "../05-BLL/shopping-cart-logic";

const router = express.Router();

//Get all shopping-carts:
router.get("/all-carts", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const shoppingCarts = await shoppingCartLogic.getAllShoppingCarts();
            res.json(shoppingCarts);
      } catch (err: any) {
            next(err);
      }
});

//Get shopping-cart by customer id:
router.get("/:customerId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const customerId = +req.params.customerId;
            const shoppingCart = await shoppingCartLogic.getShoppingCartByCustomerId(customerId);
            res.json(shoppingCart);
      } catch (err: any) {
            next(err);
      }
});

//Create new shopping-cart:
router.post("/new-shopping-cart", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const shoppingCart = await shoppingCartLogic.createNewShoppingCartForNewCustomer(req.body);
            res.status(200).json(shoppingCart);
      } catch (err: any) {
            next(err);
      }
});

//Get all items from shopping-cart:
router.get("/items-in-cart/:shoppingCartId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const shoppingCartId = +req.params.shoppingCartId;
            const itemsInCart = await shoppingCartLogic.getAllItemsFromCartByShoppingCartId(shoppingCartId);
            res.json(itemsInCart);
      } catch (err: any) {
            next(err);
      }
});


//Add item to shopping-cart:
router.post("/add-to-cart", async (req: Request, res: Response, next: NextFunction) => {
      try {
            
            const addedItem = await shoppingCartLogic.addItemToShoppingCart(req.body);
            res.status(200).json(addedItem);
      } catch (err: any) {
            next(err);
      }
});


router.patch("/update-stock", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const updatedItem = await shoppingCartLogic.updateStockInCart(req.body);
            res.status(200).json(updatedItem);
      } catch (err: any) {
            next(err);
      }
});

router.delete("/remove-from-cart/:productId/:shoppingCartId", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const productId = +req.params.productId;
            const shoppingCartId = +req.params.shoppingCartId;
            await shoppingCartLogic.removeItemFromCart(productId, shoppingCartId);;
            res.status(200).json("Item removed");

      } catch (err: any) {
            next(err);
      }
});

router.post("/make-order", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const order = new OrderModel(req.body);
            const newOrder = await shoppingCartLogic.makeOrder(order);
            res.json(newOrder);
      } catch (err: any) {
            next(err);
      }
})
export default router;