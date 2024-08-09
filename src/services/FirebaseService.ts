import admin from "firebase-admin";

class FirebaseService{
    async sentNotification(){
        admin.initializeApp({
            credential: admin.credential.cert("")
        });

        admin.messaging().send({
            notification: {
                title: "Teste",
                body: "sfasdfasdfasdf"
            },
            token: "fdOHLjUoRZubIHFXyMH9yJ:APA91bEr9UvUR2jIrR_8xASNoYsdTtSLSpRxV48IUKVgNMG4VEuQL_FxzvsCd5dHW807SONO6RCHAeHOmqchs_m8EmWxjsFZz-WHm-vABhx82ROH-plR03RB6VotEOLIwrQ6mu8iuOeQ"
        }).then((response) => {
            console.log('Mensagem enviada com sucesso:', response);
        }).catch((error) => {
            console.error('Erro ao enviar mensagem:', error);
        });
    }
}

export default new FirebaseService();