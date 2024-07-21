import {AppDataSource} from "../data-source";

import OrderStatusEnum from "../types/OrderStatusEnum";

import Order from "../entity/Order";

class DashboardService{
    async list(userId:string){
        const orderRepository = AppDataSource.getRepository(Order);

        const pendentes = await orderRepository.count({
            where: {
                id: userId,
                status: OrderStatusEnum.pendente,
            }
        });

        const retiradas = await orderRepository.count({
            where: {
                id: userId,
                status: OrderStatusEnum.retirado,
            }
        });

        const entregues = await orderRepository.count({
            where: {
                id: userId,
                status: OrderStatusEnum.entregue,
            }
        });

        const problemas = await orderRepository.count({
            where: {
                id: userId,
                status: OrderStatusEnum.problema,
            }
        });

        const canceladas = await orderRepository.count({
            where: {
                id: userId,
                status: OrderStatusEnum.cancelado,
            }
        });

        return {
            pendentes,
            retiradas,
            entregues,
            problemas,
            canceladas,
        };
    }
}

export default new DashboardService();