import "express-async-errors";

import express from "express";

import cors from "cors";

import routes from "./routes";
import errorHandling from "./middlewares/errorHandling";

import { AppDataSource } from "./data-source";

import path from "path";

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(cors());
    app.use('/password/create', express.static(path.join(__dirname, 'views/resetPassword')));
    app.use(express.json());
    app.use(routes);
    app.use(errorHandling);

    app.listen(3333);
}).catch(error => console.log(error));
