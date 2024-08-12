import {Router} from "express";

import NotificationController from "../controllers/NotificationController";

const notificationRouter = Router();

notificationRouter.post("/create", NotificationController.create);

export default notificationRouter;