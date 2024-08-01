import {Router} from "express";

import DeliverymanPasswordController from "../controllers/DeliverymanPasswordController";

const deliverymanPasswordRouter = Router();

deliverymanPasswordRouter.post("/updatepassword",DeliverymanPasswordController.updatePassword);

export default deliverymanPasswordRouter;