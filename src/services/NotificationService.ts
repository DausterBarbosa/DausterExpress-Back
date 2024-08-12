import NotificationData from "../types/NotificationData";

import FirebaseService from "./FirebaseService";

class NotificationService{
    async create(data:NotificationData){
        await FirebaseService.sentNotification(data.fcm_token, "Nova mensagem", data.message);
    }
}

export default new NotificationService();