import {NextFunction, Request, Response} from "express";

import * as yup from "yup";

import DeliverymanService from "../services/DeliverymanService";
import DeliverymanData from "../types/DeliverymanData";
import HttpError from "../erros/HttpError";

class DeliverymanController {
    async create(req:Request, res:Response, next:NextFunction) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            sobrenome: yup.string().required(),
            email: yup.string().email().required(),
            telefone: yup.string().matches(/^\(\d{2}\)\d{4,5}-\d{4}$/).required(),
            estado: yup.string().length(2).required(),
            cidade: yup.string().required(),
            cep: yup.string().matches(/^\d{5}-\d{3}$/).required(),
            endereco: yup.string().required(),
            numero: yup.string().required()
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as DeliverymanData;
            await DeliverymanService.create(validateData);
            return res.status(200).json({
                error: false,
                message: "Usuário criado com sucesso."
            });
        } catch (error:any) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.errors.map((err: string) => err);
                return next(new HttpError(400, `Validation error: ${validationErrors.join(', ')}`));
            }
            next(error);
        }
    }

    async list(req:Request, res:Response, next:NextFunction){
        const {page, take, mode, entregador} = req.query;

        const deliverymans = await DeliverymanService.list(page, take, mode, entregador);
        return res.status(200).json({
            error: false,
            total: deliverymans.count,
            data: deliverymans.deliverymans
        });
    }

    async update(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            nome: yup.string().required(),
            sobrenome: yup.string().required(),
            email: yup.string().email().required(),
            telefone: yup.string().matches(/^\(\d{2}\)\d{4,5}-\d{4}$/).required(),
            estado: yup.string().length(2).required(),
            cidade: yup.string().required(),
            cep: yup.string().matches(/^\d{5}-\d{3}$/).required(),
            endereco: yup.string().required(),
            numero: yup.string().required()
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as DeliverymanData;
            await DeliverymanService.update(req.params.id, validateData);
            return res.status(200).json({
                error: false,
                message: "Usuário atualizado com sucesso."
            });
        } catch (error:any) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.errors.map((err: string) => err);
                return next(new HttpError(400, `Validation error: ${validationErrors.join(', ')}`));
            }
            next(error);
        }
    }

    async delete(req:Request, res:Response, next:NextFunction){
        await DeliverymanService.delete(req.params.id);
        return res.status(200).json({
            error: false,
            message: "Usuário deletado com sucesso."
        });
    }
}

export default new DeliverymanController();