import {Router} from "express";

import OrderController from "../controllers/OrderController";

const orderRouter = Router();

orderRouter.get("/", OrderController.list);
orderRouter.post("/create", OrderController.create);
orderRouter.put("/:id/status", OrderController.status);
orderRouter.get("/status", OrderController.allStatus);

export default orderRouter;