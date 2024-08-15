import {Router} from "express";

import AdmPasswordController from "../controllers/AdmPasswordController";

const admPasswordRouter = Router();

admPasswordRouter.post("/login", AdmPasswordController.login);

export default admPasswordRouter;