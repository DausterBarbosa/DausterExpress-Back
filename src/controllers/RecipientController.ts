import {NextFunction, Request, Response} from "express";

import * as yup from "yup";
import HttpError from "../erros/HttpError";
import RecipientData from "../types/RecipientData";
import RecipientService from "../services/RecipientService";

class RecipientController {
    async create(req:Request, res:Response, next:NextFunction) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            cnpj: yup.string().matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).required(),
            email: yup.string().email().required(),
            telefone: yup.string().matches(/^\(\d{2}\)\d{4,5}-\d{4}$/).required(),
            estado: yup.string().length(2).required(),
            cidade: yup.string().required(),
            cep: yup.string().matches(/^\d{5}-\d{3}$/).required(),
            endereco: yup.string().required(),
            numero: yup.string().required(),
            complemento: yup.string().max(200).required()
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as RecipientData;
            await RecipientService.create(validateData);
            return res.status(200).json({
                error: false,
                message: "Destinatário criado com sucesso."
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
        const {page, take} = req.query;

        const recipients = await RecipientService.list(page, take);
        return res.status(200).json({
            error: false,
            data: recipients
        });
    }

    async update(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            nome: yup.string().required(),
            cnpj: yup.string().matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).required(),
            email: yup.string().email().required(),
            telefone: yup.string().matches(/^\(\d{2}\)\d{4,5}-\d{4}$/).required(),
            estado: yup.string().length(2).required(),
            cidade: yup.string().required(),
            cep: yup.string().matches(/^\d{5}-\d{3}$/).required(),
            endereco: yup.string().required(),
            numero: yup.string().required(),
            complemento: yup.string().max(200).required()
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as RecipientData;
            await RecipientService.update(req.params.id, validateData);
            return res.status(200).json({
                error: false,
                message: "Destinatário atualizado com sucesso."
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
        await RecipientService.delete(req.params.id);
        return res.status(200).json({
            error: false,
            message: "Destinatário deletado com sucesso."
        });
    }
}

export default new RecipientController();