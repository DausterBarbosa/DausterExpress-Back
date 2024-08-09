import {AppDataSource} from "../data-source";

import Deliveryman from "../entity/Deliveryman";

class FcmTokenService{
    async save(fcmToken:string, userId:string){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliveryman = await deliverymanRepository.findOne({
            where: {
                id: userId,
            }
        });

        deliveryman.fcm_token = fcmToken;

        await deliverymanRepository.save(deliveryman);
    }
}

export default new FcmTokenService();