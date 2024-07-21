import {Router} from "express";

import DashboardController from "../controllers/DashboardController";

const dashboardRouter = Router();

dashboardRouter.get("/dashboard", DashboardController.list);

export default dashboardRouter;