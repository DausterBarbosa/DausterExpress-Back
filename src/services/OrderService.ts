import {AppDataSource} from "../data-source";

import OrderData from "../types/OrderData";
import OrderStatusEnum from "../types/OrderStatusEnum";

import Order from "../entity/Order";
import Recipient from "../entity/Recipient";
import Deliveryman from "../entity/Deliveryman";
import HttpError from "../erros/HttpError";
import { ILike } from "typeorm";

class OrderService {
    async create(data:OrderData){
        const orderRepository = AppDataSource.getRepository(Order);
        const recipientRepository = AppDataSource.getRepository(Recipient);
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliveryman = await deliverymanRepository.findOneBy({id: data.entregador});

        if(!deliveryman){
            throw new HttpError(409, "Entregador informado não existe.");
        }

        const recipient = await recipientRepository.findOneBy({id: data.destinatario});

        if(!recipient){
            throw new HttpError(409, "Destinatário informado não existe.");
        }

        await orderRepository.save({
            destinatario: recipient,
            entregador: deliveryman,
            status: OrderStatusEnum.pendente,
            encomenda: data.encomenda,
        });
    }

    async list(page, take, status, encomendaName){
        const orderRepository = AppDataSource.getRepository(Order);

        let whereConditions = {};

        if(status !== "todos"){
            whereConditions["status"] = status;
        }

        if(encomendaName) {
            whereConditions["encomenda"] = ILike(`%${encomendaName}%`);
        }

        const orders = await orderRepository.find({
            take: take || 5,
            skip: (page - 1) * take || 0,
            relations: ["entregador", "destinatario"],
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

export default new OrderService();