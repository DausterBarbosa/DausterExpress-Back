import "express-async-errors";

import express from "express";

import routes from "./routes";
import errorHandling from "./middlewares/errorHandling";

import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());
    app.use(routes);
    app.use(errorHandling);

    app.listen(3333);
}).catch(error => console.log(error))
