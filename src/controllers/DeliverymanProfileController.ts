import {NextFunction, Response} from "express";

import * as yup from "yup";

import HttpError from "../erros/HttpError";
import PhotoProfileData from "../types/PhotoProfileData";
import CustomRequest from "../types/CustomRequest";
import DeliverymanProfileService from "../services/DeliverymanProfileService";

class DeliverymanProfileController{
    async updatePhotoProfile(req:CustomRequest, res:Response, next:NextFunction){
        const schema = yup.object().shape({
            url_image_profile: yup.string().required(),
        }).strict();

        try {
            const validateData = await schema.validate(req.body, { abortEarly: false }) as PhotoProfileData;
            await DeliverymanProfileService.updatePhotoProfile(validateData, req.userId);
            return res.status(200).json({
                error: false,
                message: "Foto de perfil alterada com sucesso."
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

export default new DeliverymanProfileController();