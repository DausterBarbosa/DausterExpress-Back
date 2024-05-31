import {Request, Response, NextFunction} from "express";

import HttpError from "../erros/HttpError";

export default function errorHandling(err:any, req:Request, res:Response, next:NextFunction){
    console.error(err.stack);

    if (err instanceof HttpError) {
        return res.status(err.status).json({
            error: true,
            message: err.message
        });
    } else {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
}