import {AppDataSource} from "../data-source";

import Deliveryman from "../entity/Deliveryman";

import bcrypt from "bcrypt";

import HttpError from "../erros/HttpError";

class DeliverymanPasswordService{
    async updatePassword(newPassword:string, userId:string){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        try {
            const hash = await bcrypt.hash(newPassword, 10);

            const deliveryman = await deliverymanRepository.findOne({
                where: {
                    id: userId,
                }
            });
            
            deliveryman.password_hash = hash;
            
            await deliverymanRepository.save(deliveryman);
        } catch (error) {
            throw new HttpError(500, "Erro ao realizar a operação.");
        }
    }
}

export default new DeliverymanPasswordService();