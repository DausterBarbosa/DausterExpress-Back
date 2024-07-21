import {Router} from "express";

import deliverymanRouter from "./deliverymanRouter";
import recipientRouter from "./recipientRouter";
import orderRouter from "./orderRouter";
import problemRouter from "./problemRouter";
import passwordRouter from "./passwordRouter";
import dashboardRouter from "./dashboardRouter";

import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// Rotas do ADM
router.use("/deliveryman", deliverymanRouter);
router.use("/recipient", recipientRouter);
router.use("/order", orderRouter);
router.use("/problem", problemRouter);
router.use("/password", passwordRouter);

// Middlware de autenticação
router.use(authMiddleware);

// Rotas do entregador
router.use("/deliveryman", dashboardRouter);

export default router;