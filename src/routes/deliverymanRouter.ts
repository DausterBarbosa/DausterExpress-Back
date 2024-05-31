import {Router} from "express";

import DeliverymanController from "../controllers/DeliverymanController";

const deliverymanRouter = Router();

deliverymanRouter.get("/",DeliverymanController.list);
deliverymanRouter.post("/create", DeliverymanController.create);
deliverymanRouter.put("/update/:id", DeliverymanController.update);
deliverymanRouter.delete("/delete/:id", DeliverymanController.delete);

export default deliverymanRouter;