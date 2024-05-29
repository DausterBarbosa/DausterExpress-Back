import {Request, Response} from "express";

import * as yup from "yup";

import DeliverymanService from "../services/DeliverymanService";

class DeliverymanController {
    async create(req:Request, res:Response) {
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
            const validateData = await schema.validate(req.body, { abortEarly: false });
            DeliverymanService.create(validateData);
        } catch (error:any) {
            return res.status(400).json({
                error: true,
                message: error.errors
            });
        }
    }
}

export default new DeliverymanController();