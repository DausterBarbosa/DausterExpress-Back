import { ILike } from "typeorm";
import {AppDataSource} from "../data-source";

import Deliveryman from "../entity/Deliveryman";

import HttpError from "../erros/HttpError";

import DeliverymanData from "../types/DeliverymanData";

class DeliverymanService {
    async create(data:DeliverymanData){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliveryman = await deliverymanRepository.findOneBy({email: data.email});

        if (deliveryman){
            throw new HttpError(409, "Email já cadastrado.");
        }

        await deliverymanRepository.save(data);
    }

    async list(page, take, mode, deliverymanName){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        let selectFields = [];

        let whereConditions = {};

        if(mode === "summary"){
            selectFields = ["id", "nome", "sobrenome"];
        }

        if(deliverymanName) {
            whereConditions["nome"] = ILike(`%${deliverymanName}%`);
        }

        const deliverymans = await deliverymanRepository.find({
            take,
            skip: take && (page - 1) * take,
            select: selectFields,
            where: whereConditions,
            order: {
                created_at: "DESC",
            }
        });

        const count = await deliverymanRepository.count();

        return {
            count,
            deliverymans
        };
    }

    async update(id, data:DeliverymanData){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        await deliverymanRepository.save({id, ...data});
    }

    async delete(id){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        await deliverymanRepository.delete({id});
    }
}

export default new DeliverymanService();