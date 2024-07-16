import {NextFunction, Request, Response} from "express";

import * as yup from "yup";

import PasswordService from "../services/PasswordService";

import PasswordData from "../types/PasswordData";
import HttpError from "../erros/HttpError";

import path from "path";

class PasswordController{
    async create(req:Request, res:Response, next:NextFunction){
        return res.sendFile(path.join(__dirname, "../views/resetPassword/index.html"));
    }

    async register(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            password: yup.string().required(),
            token: yup.string().required()
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as PasswordData;
            await PasswordService.register(validateData);
            return res.status(200).json({
                error: false,
                message: "Senha cadastrada com sucesso."
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

export default new PasswordController();