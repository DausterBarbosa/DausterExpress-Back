import {NextFunction, Response} from "express";

import DashboardService from "../services/DashboardService";

import CustomRequest from "../types/CustomRequest";

class DashboardController {
    async list(req:CustomRequest, res:Response, next:NextFunction){
        const data = await DashboardService.list(req.userId);

        return res.status(200).json({
            error: false,
            data,
        });
    }
}

export default new DashboardController();