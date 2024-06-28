import {NextFunction, Request, Response} from "express";

import * as yup from "yup";
import HttpError from "../erros/HttpError";
import ProblemService from "../services/ProblemService";
import ProblemData from "../types/ProblemData";

class ProblemController {
    async list(req:Request, res:Response, next:NextFunction){
        const {page, take} = req.query;

        const orders = await ProblemService.list(page, take);
        return res.status(200).json({
            error: false,
            total: orders.count,
            data: orders.orders,
        });
    }

    async create(req:Request, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            id: yup.string().required(),
            descricao: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as ProblemData;
            await ProblemService.create(validateData);
            return res.status(200).json({
                error: false,
                message: "Problema criado com sucesso."
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

export default new ProblemController();