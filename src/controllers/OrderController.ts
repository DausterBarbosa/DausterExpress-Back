import {NextFunction, Request, Response} from "express";

import * as yup from "yup";
import HttpError from "../erros/HttpError";
import OrderService from "../services/OrderService";
import OrderData from "../types/OrderData";
import OrderStatus from "../types/OrderStatus";
import OrderStatusEnum from "../types/OrderStatusEnum";

class OrderController {
    async create(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            entregador: yup.string().required(),
            destinatario: yup.string().required(),
            encomenda: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as OrderData;
            await OrderService.create(validateData);
            return res.status(200).json({
                error: false,
                message: "Encomenda criada com sucesso."
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
        const {page, take, status, encomenda} = req.query;

        const orders = await OrderService.list(page, take, status, encomenda);
        return res.status(200).json({
            error: false,
            total: orders.count,
            data: orders.orders,
        });
    }

    async status(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            status: yup.string().oneOf(Object.values(OrderStatusEnum)).required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as OrderStatus;
            await OrderService.status(validateData.status, req.params.id);
            return res.status(200).json({
                error: false,
                message: "Status atualizado com sucesso."
            });
        } catch (error:any) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.errors.map((err: string) => err);
                return next(new HttpError(400, `Validation error: ${validationErrors.join(', ')}`));
            }
            next(error);
        }
    }

    async allStatus(req:Request, res:Response, next:NextFunction){
        const status = await OrderService.allStatus();
        return res.status(200).json({
            error: false,
            data: status,
        });
    }
}

export default new OrderController();