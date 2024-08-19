require('dotenv/config');

import {NextFunction, Response} from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import CustomRequest from "../types/CustomRequest";
import HttpError from "../erros/HttpError";

export default function authMiddleware(req:CustomRequest, res:Response, next:NextFunction){
    const [,token] = req.header("Authorization").split(" ");

    if(!token){
        throw new HttpError(401, "Acesso negado. Token não encontrado.");
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_PASS);

        req.userId = (data as JwtPayload).id as string;

        next();
    } catch (error) {
        throw new HttpError(401, "Acesso negado. Token inválido.");
    }
}