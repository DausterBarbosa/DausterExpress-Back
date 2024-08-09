import { NextFunction, Response } from "express";

import FcmTokenService from "../services/FcmTokenService";

import CustomRequest from "../types/CustomRequest";

import * as yup from "yup";

import HttpError from "../erros/HttpError";

import FcmTokenData from "../types/FcmTokenData";

class FcmTokenController{
    async save(req:CustomRequest, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            token: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as FcmTokenData;
            await FcmTokenService.save(validateData.token, req.userId);
            return res.status(200).json({
                error: false,
                message: "FCM-TOKEN salvo com sucesso."
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

export default new FcmTokenController();