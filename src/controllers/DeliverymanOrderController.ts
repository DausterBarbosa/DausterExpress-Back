import { NextFunction, Response, Request } from "express";

import * as yup from "yup";

import CustomRequest from "../types/CustomRequest";

import DeliverymanOrderService from "../services/DeliverymanOrderService";

import DeliveredData from "../types/DeliveredData";
import HttpError from "../erros/HttpError";

class DeliverymanOrderController{
    async list(req:CustomRequest, res:Response, next:NextFunction){
        const {page, take, status, encomenda} = req.query;

        const orders = await DeliverymanOrderService.list(page, take, status, encomenda, req.userId);
        return res.status(200).json({
            error: false,
            total: orders.count,
            data: orders.orders,
        });
    }

    async delivered(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            encomenda: yup.string().required(),
            url_image: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as DeliveredData;
            await DeliverymanOrderService.delivered(validateData);
            return res.status(200).json({
                error: false,
                message: "Encomenda entregue com sucesso."
            });
        } catch (error:any) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.errors.map((err: string) => err);
                return next(new HttpError(400, `Validation error: ${validationErrors.join(', ')}`));
            }
            next(error);
        }
    }
}

export default new DeliverymanOrderController();