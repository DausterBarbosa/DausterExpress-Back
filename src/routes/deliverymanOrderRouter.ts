import {Router} from "express";

import DeliverymanOrderController from "../controllers/DeliverymanOrderController";

const deliverymanRouter = Router();

deliverymanRouter.get("/order", DeliverymanOrderController.list);
deliverymanRouter.post("/delivered", DeliverymanOrderController.delivered);

export default deliverymanRouter;