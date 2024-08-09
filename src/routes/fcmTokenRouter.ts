import {Router} from "express";

import FcmTokenController from "../controllers/FcmTokenController";

const fcmTokenRouter = Router();

fcmTokenRouter.post("/fcm-token", FcmTokenController.save);

export default fcmTokenRouter;