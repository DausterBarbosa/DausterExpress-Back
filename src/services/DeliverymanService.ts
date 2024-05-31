import {AppDataSource} from "../data-source";

import Deliveryman from "../entity/Deliveryman";

import HttpError from "../erros/HttpError";

import {DeliverymanData} from "../types";

class DeliverymanService {
    async create(data:DeliverymanData){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliveryman = await deliverymanRepository.findOneBy({email: data.email});

        if (deliveryman){
            throw new HttpError(409, "Email já cadastrado.");
        }

        await deliverymanRepository.save(data);
    }

    async list(page, take){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliverymans = await deliverymanRepository.find({
            take: take || 5,
            skip: (page - 1) * take || 0
        });

        return deliverymans;
    }
}

export default new DeliverymanService();