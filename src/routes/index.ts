import {Router} from "express";

import deliverymanRouter from "./deliverymanRouter";
import recipientRouter from "./recipientRouter";
import orderRouter from "./orderRouter";
import problemRouter from "./problemRouter";
import passwordRouter from "./passwordRouter";

const router = Router();

router.use("/deliveryman", deliverymanRouter);
router.use("/recipient", recipientRouter);
router.use("/order", orderRouter);
router.use("/problem", problemRouter);
router.use("/password", passwordRouter);

export default router;