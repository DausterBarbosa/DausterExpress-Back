import "reflect-metadata";
import { DataSource } from "typeorm";

import Deliveryman from "./entity/Deliveryman";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "kala.db.elephantsql.com",
    port: 5432,
    username: "hqgsypma",
    password: "O_A0w0fvUSxvAAlZaVo-TXz7pXLvubH7",
    database: "hqgsypma",
    synchronize: true,
    logging: false,
    entities: [Deliveryman],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
});