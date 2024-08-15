import {Router} from "express";

import deliverymanRouter from "./deliverymanRouter";
import recipientRouter from "./recipientRouter";
import orderRouter from "./orderRouter";
import problemRouter from "./problemRouter";
import passwordRouter from "./passwordRouter";
import dashboardRouter from "./dashboardRouter";
import deliverymanOrderRouter from "./deliverymanOrderRouter";
import deliverymanProblemRouter from "./deliverymanProblemRouter";
import deliverymanProfileRouter from "./deliverymanProfileRouter";
import deliverymanPasswordRouter from "./deliverymanPasswordRouter";
import fcmTokenRouter from "./fcmTokenRouter";
import notificationRoute from "./notificationRoute";
import admPasswordRouter from "./admpasswordRouter";

import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Rota de login do entregador
router.use("/password", passwordRouter);

// Rota de login do ADM
router.use("/adm-password", admPasswordRouter);

// Middlware de autenticação
router.use(authMiddleware);

// Rotas do ADM
router.use("/deliveryman", deliverymanRouter);
router.use("/recipient", recipientRouter);
router.use("/order", orderRouter);
router.use("/problem", problemRouter);
router.use("/notification", notificationRoute);

// Rotas do entregador
router.use("/deliveryman", dashboardRouter);
router.use("/deliveryman", deliverymanOrderRouter);
router.use("/deliveryman", deliverymanProblemRouter);
router.use("/deliveryman", deliverymanRouter);
router.use("/deliveryman", deliverymanProfileRouter);
router.use("/deliveryman", deliverymanPasswordRouter);
router.use("/deliveryman", fcmTokenRouter);

export default router;