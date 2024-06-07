import {Router} from "express";

import OrderController from "../controllers/OrderController";

const orderRouter = Router();

orderRouter.get("/", OrderController.list);
orderRouter.post("/create", OrderController.create);

export default orderRouter;