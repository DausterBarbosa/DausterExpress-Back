import {Router} from "express";

import DeliverymanController from "../controllers/DeliverymanController";

const deliverymanRouter = Router();

deliverymanRouter.post("/create", DeliverymanController.create);
deliverymanRouter.get("/",DeliverymanController.list);

export default deliverymanRouter;