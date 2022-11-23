import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import productsController from "./06-Controller/products-controller";
import authController from "./06-Controller/auth-controller";
import shoppingCartController from "./06-Controller/shopping-cart-controller";
import ordersController from "./06-Controller/orders-controller";
import errorsHandler from "./02-Middleware/handler";
import ClientError from "./03-Models/client-error";
import productsLogic from "./05-BLL/products-logic";



const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/shopping-carts", shoppingCartController);
server.use("/api/products", productsController);
server.use("/api/orders", ordersController);
server.use("/api/auth", authController);

server.use("/api/all-cities", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const cities = await productsLogic.allCities();
            res.json(cities);
      } catch (err: any) {
            next(err);
      }
});

server.use("*", (req: Request, res: Response, next: NextFunction) => {
      const error = new ClientError(404, "Route Not Found");
      next(error);
});

server.use(errorsHandler);

server.listen(3001, () => console.log("Listening..."));



server.use(errorsHandler);