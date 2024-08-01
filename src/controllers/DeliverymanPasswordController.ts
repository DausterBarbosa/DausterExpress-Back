import { NextFunction, Response } from "express";

import * as yup from "yup";

import CustomRequest from "../types/CustomRequest";

import DeliverymanPasswordService from "../services/DeliverymanPasswordService";
import HttpError from "../erros/HttpError";
import NewPasswordData from "../types/NewPasswordData";

class DeliverymanPasswordController{
    async updatePassword(req:CustomRequest, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            newPassword: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as NewPasswordData;
            await DeliverymanPasswordService.updatePassword(validateData.newPassword, req.userId);
            return res.status(200).json({
                error: false,
                message: "Senha atualizada com sucesso."
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

export default new DeliverymanPasswordController();