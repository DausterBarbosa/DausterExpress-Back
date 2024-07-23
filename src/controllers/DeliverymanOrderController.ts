import { NextFunction, Response } from "express";

import CustomRequest from "../types/CustomRequest";

import DeliverymanOrderService from "../services/DeliverymanOrderService";

class DeliverymanOrderController{
    async list(req:CustomRequest, res:Response, next:NextFunction){
        const {page, take, status, encomenda} = req.query;

        const orders = await DeliverymanOrderService.list(page, take, status, encomenda, req.userId);
        return res.status(200).json({
            error: false,
            total: orders.count,
            data: orders.orders,
        });
    }
}

export default new DeliverymanOrderController();