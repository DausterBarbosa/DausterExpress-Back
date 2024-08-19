require('dotenv/config');

import "reflect-metadata";

import { DataSource } from "typeorm";

import Deliveryman from "./entity/Deliveryman";
import Recipient from "./entity/Recipient";
import Order from "./entity/Order";
import Problem from "./entity/Problem";
import Administrator from "./entity/Administrator";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Deliveryman, Recipient, Order, Problem, Administrator],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
});