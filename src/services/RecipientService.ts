import {AppDataSource} from "../data-source";

import Recipient from "../entity/Recipient";

import HttpError from "../erros/HttpError";

import RecipientData from "../types/RecipientData";

class RecipientService {
    async create(data:RecipientData){
        const recipientRepository = AppDataSource.getRepository(Recipient);

        const deliveryman = await recipientRepository.findOneBy({cnpj: data.cnpj});

        if (deliveryman){
            throw new HttpError(409, "CNPJ já cadastrado.");
        }

        await recipientRepository.save(data);
    }

    async list(page, take, mode){
        const recipientRepository = AppDataSource.getRepository(Recipient);

        let selectFields = [];

        if(mode === "summary"){
            selectFields = ["id", "nome"];
        }

        const recipients = await recipientRepository.find({
            take,
            skip: take && (page - 1) * take,
            select: selectFields,
        });

        return recipients;
    }

    async update(id, data:RecipientData){
        const recipientRepository = AppDataSource.getRepository(Recipient);

        await recipientRepository.save({id, ...data});
    }

    async delete(id){
        const recipientRepository = AppDataSource.getRepository(Recipient);

        await recipientRepository.delete({id});
    }
}

export default new RecipientService();