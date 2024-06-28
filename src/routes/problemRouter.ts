import {Router} from "express";

import ProblemController from "../controllers/ProblemController";

const problemRouter = Router();

problemRouter.post("/", ProblemController.create);
problemRouter.get("/", ProblemController.list);

export default problemRouter;