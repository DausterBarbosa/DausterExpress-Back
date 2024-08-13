import admin from "firebase-admin";
const ServiceAccountKey = require("../config/serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(ServiceAccountKey),
    });
}

class FirebaseService {
    async sentNotification(fcmToken: string, title: string, body: string, screenName:string) {
        try {
            const response = await admin.messaging().send({
                notification: {
                    title,
                    body,
                },
                token: fcmToken,
                data: {
                    screenName,
                }
            });
            console.log('Mensagem enviada com sucesso:', response);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }
}

export default new FirebaseService();
