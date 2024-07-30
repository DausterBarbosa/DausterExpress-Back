import {AppDataSource} from "../data-source";

import Order from "../entity/Order";

import { ILike } from "typeorm";

import DeliveredData from "../types/DeliveredData";

import OrderStatusEnum from "../types/OrderStatusEnum";

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
            relations: ["destinatario", "problemas"],
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

    async delivered(data:DeliveredData){
        const orderRepository = AppDataSource.getRepository(Order);

        const order = await orderRepository.findOne({
            where: {
                id: data.encomenda,
            }
        });

        order.status = OrderStatusEnum.entregue;
        order.imagem_url = data.url_image;
        order.data_entrega = new Date();

        await orderRepository.save(order);
    }
}

export default new DeliverymanOrderService();