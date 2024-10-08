require('dotenv/config');

import {AppDataSource} from "../data-source";

import Deliveryman from "../entity/Deliveryman";
import HttpError from "../erros/HttpError";
import LoginData from "../types/LoginData";

import PasswordData from "../types/PasswordData";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class PasswordService{
    async register(data:PasswordData){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliveryman = await deliverymanRepository.findOneBy({reset_token: data.token});

        if(!deliveryman){
            throw new HttpError(400, "Token inválido.");
        }

        try {
            const hash = await bcrypt.hash(data.password, 10);

            deliveryman.reset_token = null;
            deliveryman.password_hash = hash;
            
            await deliverymanRepository.save(deliveryman);
        } catch (error) {
            throw new HttpError(500, "Erro ao realizar a operação.");
        }
    }

    async login(data:LoginData){
        const deliverymanRepository = AppDataSource.getRepository(Deliveryman);

        const deliveryman = await deliverymanRepository.findOneBy({email: data.email});

        if(!deliveryman || deliveryman.reset_token !== null){
            throw new HttpError(404, "Usuário não encontrado.");
        }

        const passwordValid = await bcrypt.compare(data.password, deliveryman.password_hash);

        if(!passwordValid){
            throw new HttpError(401, "Senha incorreta.");
        }

        const token = jwt.sign({
            id: deliveryman.id,
        },
        process.env.SECRET_PASS,
        {
            expiresIn: process.env.EXPIRES_IN,
        });

        return {
            token,
            user: {
                id: deliveryman.id,
                nome: deliveryman.nome,
                sobrenome: deliveryman.sobrenome,
                email: deliveryman.email,
                telefone: deliveryman.telefone,
                estado: deliveryman.estado,
                cidade: deliveryman.cidade,
                cep: deliveryman.cep,
                endereco: deliveryman.endereco,
                numero: deliveryman.numero,
                url_image_profile: deliveryman.url_image_profile,
            }
        };
    }
}

export default new PasswordService();