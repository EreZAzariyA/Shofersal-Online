import express, { NextFunction, Request, Response } from "express";
import orderLogic from "../05-BLL/order-logic";

const router = express.Router();

//Get all orders:
router.get("/all-orders", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const orders = await orderLogic.getAllOrders();
            res.json(orders);
      } catch (err: any) {
            next(err);
      }
})





export default router;