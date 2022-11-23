import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../03-Models/credentials-model";
import CustomerModel from "../03-models/customer-model";
import authLogic from "../05-BLL/auth-logic";

const router = express.Router();

//Register:
//POST http://localhost:3001/api/auth/register:
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const customer = new CustomerModel(req.body);
            const addedCustomer = await authLogic.register(customer);
            res.status(201).json(addedCustomer);
      } catch (err: any) {
            next(err);
      }
});

//Login:
//POST http://localhost:3001/api/auth/login:
router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
      try {
            const credentials = new CredentialsModel(req.body);
            const token = await authLogic.login(credentials);
            res.status(201).json(token);
      } catch (err: any) {
            next(err);
      }
});

export default router;