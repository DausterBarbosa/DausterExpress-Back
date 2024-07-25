import { NextFunction, Response } from "express";

import * as yup from "yup";

import CustomRequest from "../types/CustomRequest";

import DeliverymanProblemService from "../services/DeliverymanProblemService";
import HttpError from "../erros/HttpError";
import ProblemData from "../types/ProblemData";

class DeliverymanProblemController{
    async create(req:CustomRequest, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            id: yup.string().required(),
            descricao: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as ProblemData;
            const problem = await DeliverymanProblemService.create(validateData, req.userId);
            return res.status(200).json({
                error: false,
                data: problem,
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

export default new DeliverymanProblemController();