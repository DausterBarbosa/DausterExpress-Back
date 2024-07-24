import {Router} from "express";

import DeliverymanProblemController from "../controllers/DeliverymanProblemController";

const deliverymanProblemRouter = Router();

deliverymanProblemRouter.post("/problem", DeliverymanProblemController.create);

export default deliverymanProblemRouter;