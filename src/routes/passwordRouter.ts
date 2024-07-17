import {Router} from "express";

import PasswordController from "../controllers/PasswordController";

const orderRouter = Router();

orderRouter.get("/create", PasswordController.create);
orderRouter.post("/register", PasswordController.register);
orderRouter.post("/login", PasswordController.login);

export default orderRouter;