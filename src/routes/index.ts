import {Router} from "express";

import deliverymanRouter from "./deliverymanRouter";

const router = Router();

router.use("/deliveryman", deliverymanRouter);

export default router;