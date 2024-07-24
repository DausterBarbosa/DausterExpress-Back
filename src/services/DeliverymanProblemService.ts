import { AppDataSource } from "../data-source";

import ProblemData from "../types/ProblemData";

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

        await problemRepository.save({
            encomenda: order,
            descricao: data.descricao,
        });
    }
}

export default new DeliverymanProblemService();