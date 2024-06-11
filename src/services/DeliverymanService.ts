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

    async list(page, take, mode){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        let selectFields = [];

        if(mode === "summary"){
            selectFields = ["id", "nome", "sobrenome"];
        }

        const deliverymans = await deliverymanRepository.find({
            take,
            skip: take && (page - 1) * take,
            select: selectFields,
        });

        return deliverymans;
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