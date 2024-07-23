import {AppDataSource} from "../data-source";

import Order from "../entity/Order";

import { ILike } from "typeorm";

class DeliverymanOrderService{
    async list(page, take, status, encomendaName, userId){
        const orderRepository = AppDataSource.getRepository(Order);

        let whereConditions = {
            entregador: {
                id: userId
            },
        };

        if(status !== "todos"){
            whereConditions["status"] = status;
        }

        if(encomendaName) {
            whereConditions["encomenda"] = ILike(`%${encomendaName}%`);
        }

        const orders = await orderRepository.find({
            take: take || 5,
            skip: (page - 1) * take || 0,
            relations: ["destinatario"],
            where: whereConditions,
            order: {
                created_at: "DESC",
            }
        });

        const count = await orderRepository.count();

        return {
            count,
            orders
        };
    }
}

export default new DeliverymanOrderService();