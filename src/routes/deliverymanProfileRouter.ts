import {Router} from "express";

import DeliverymanProfileController from "../controllers/DeliverymanProfileController";

const deliverymanProfileRouter = Router();

deliverymanProfileRouter.post("/profilephoto",DeliverymanProfileController.updatePhotoProfile);

export default deliverymanProfileRouter;