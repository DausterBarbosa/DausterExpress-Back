import { NextFunction, Request, Response } from "express";

import * as yup from "yup";

import NotificationData from "../types/NotificationData";

import NotificationService from "../services/NotificationService";

import HttpError from "../erros/HttpError";

class NotificationController{
    async create(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            fcm_token: yup.string().required(),
            message: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as NotificationData;
            await NotificationService.create(validateData);
            return res.status(200).json({
                error: false,
                message: "Notificação enviada com sucesso."
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

export default new NotificationController();