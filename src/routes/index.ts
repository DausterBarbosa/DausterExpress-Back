import {Router} from "express";

import deliverymanRouter from "./deliverymanRouter";
import recipientRouter from "./recipientRouter";

const router = Router();

router.use("/deliveryman", deliverymanRouter);
router.use("/recipient", recipientRouter);

export default router;