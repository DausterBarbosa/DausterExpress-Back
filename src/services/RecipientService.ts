import { ILike } from "typeorm";
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

    async list(page, take, mode, recipientName){
        const recipientRepository = AppDataSource.getRepository(Recipient);

        let selectFields = [];

        let whereConditions = {};

        if(mode === "summary"){
            selectFields = ["id", "nome"];
        }

        if(recipientName) {
            whereConditions["nome"] = ILike(`%${recipientName}%`);
        }

        const recipients = await recipientRepository.find({
            take,
            skip: take && (page - 1) * take,
            select: selectFields,
            where: whereConditions,
            order: {
                created_at: "DESC",
            }
        });

        const count = await recipientRepository.count();

        return {
            count,
            recipients
        };
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