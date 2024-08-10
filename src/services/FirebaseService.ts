import admin from "firebase-admin";

const ServiceAccountKey = require("../config/serviceAccountKey.json");

class FirebaseService{
    async sentNotification(fcmToken:string, title:string, body:string){
        admin.initializeApp({
            credential: admin.credential.cert(ServiceAccountKey),
        });

        admin.messaging().send({
            notification: {
                title,
                body,
            },
            token: fcmToken,
        }).then((response) => {
            console.log('Mensagem enviada com sucesso:', response);
        }).catch((error) => {
            console.error('Erro ao enviar mensagem:', error);
        });
    }
}

export default new FirebaseService();