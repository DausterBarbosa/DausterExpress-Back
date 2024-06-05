import {Router} from "express";

import OrderController from "../controllers/OrderController";

const orderRouter = Router();

orderRouter.post("/create", OrderController.create);

export default orderRouter;