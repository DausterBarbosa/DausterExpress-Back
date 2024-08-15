import * as yup from "yup";

import {NextFunction, Request, Response} from "express";

import AdmPasswordService from "../services/AdmPasswordService";

import LoginData from "../types/LoginData";

import HttpError from "../erros/HttpError";

class AdmPasswordController{
    async login(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required()
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as LoginData;
            const data = await AdmPasswordService.login(validateData);
            return res.status(200).json({
                error: false,
                data,
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

export default new AdmPasswordController();