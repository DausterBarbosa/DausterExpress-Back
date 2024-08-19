require('dotenv/config');

import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            clientEmail: process.env.CLIENT_EMAIL,
            privateKey: process.env.PRIVATE_KEY,
            projectId: process.env.PROJECT_ID,
        }),
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
