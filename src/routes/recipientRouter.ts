import {Router} from "express";

import RecipientController from "../controllers/RecipientController";

const recipientRouter = Router();

recipientRouter.get("/",RecipientController.list);
recipientRouter.post("/create", RecipientController.create);
recipientRouter.put("/update/:id", RecipientController.update);
recipientRouter.delete("/delete/:id", RecipientController.delete);

export default recipientRouter;