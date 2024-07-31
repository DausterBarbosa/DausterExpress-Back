import { AppDataSource } from "../data-source";

import Deliveryman from "../entity/Deliveryman";

import PhotoProfileData from "../types/PhotoProfileData";

class DeliverymanProfileService{
    async updatePhotoProfile(data:PhotoProfileData, userId:string){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliveryman = await deliverymanRepository.findOne({
            where: {
                id: userId,
            }
        });

        deliveryman.url_image_profile = data.url_image_profile;

        await deliverymanRepository.save(deliveryman);
    }
}

export default new DeliverymanProfileService();