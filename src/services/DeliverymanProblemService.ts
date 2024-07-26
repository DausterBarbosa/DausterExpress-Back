import { AppDataSource } from "../data-source";

import ProblemData from "../types/ProblemData";
import OrderStatusEnum from "../types/OrderStatusEnum";

import Problem from "../entity/Problem";
import Order from "../entity/Order";

import HttpError from "../erros/HttpError";

class DeliverymanProblemService{
    async create(data:ProblemData, userId:string){
        const orderRepository = AppDataSource.getRepository(Order);
        const problemRepository = AppDataSource.getRepository(Problem);

        const order = await orderRepository.findOne({where: {id: data.id}});

        if(!order){
            throw new HttpError(404, "Encomenda não encontrada.");
        }

        order.status = OrderStatusEnum.problema;

        await orderRepository.save(order);

        const problem = await problemRepository.save({
            encomenda: order,
            descricao: data.descricao,
        });

        return {
            id: problem.id,
            descricao: problem.descricao,
            created_at: problem.created_at,
            updated_at: problem.updated_at,
        };
    }
}

export default new DeliverymanProblemService();