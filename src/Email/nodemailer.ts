require('dotenv/config');

import nodemailer from "nodemailer";

interface EmailProps{
    nome: string;
    email: string;
    url: string;
}

class Nodemailer{
    async sendEmail(data:EmailProps){
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GENERAL_EMAIL,
                pass: process.env.GENERAL_EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.GENERAL_EMAIL,
            to: data.email,
            subject: "Cadastre sua senha de acesso ao app do DausterExpress.",
            html: `<b>Seja bem vindo ao DausterExpress ${data.nome}, acesse o link abaixo para cadastrar sua senha de acesso ao app.</b> <br/> ${data.url}`
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Erro ao enviar e-mail:', error);
            }
            console.log('E-mail enviado:', info.response);
        });
    }
}

export default new Nodemailer();