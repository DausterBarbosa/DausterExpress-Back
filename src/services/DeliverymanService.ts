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
}

export default new DeliverymanService();