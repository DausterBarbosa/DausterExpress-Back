import {AppDataSource} from "../data-source";

import HttpError from "../erros/HttpError";

import Order from "../entity/Order";

import OrderStatusEnum from "../types/OrderStatusEnum";

class ProblemService{
    async list(page, take){
        const orderRepository = AppDataSource.getRepository(Order);
        
        const orders = await orderRepository.find({
            take: take || 5,
            skip: (page - 1) * take || 0,
            relations: ["entregador", "destinatario"],
            order: {
                created_at: "DESC",
            },
            where: {status: OrderStatusEnum.problema}
        });

        const count = await orderRepository.count({where: {status: OrderStatusEnum.problema}});

        return {
            count,
            orders
        };
    }

    async create(data){
        const orderRepository = AppDataSource.getRepository(Order);
        
        await orderRepository.save({
            id: data.id,
            status: OrderStatusEnum.problema,
            description_problem: data.descricao,
        });
    }
}

export default new ProblemService();