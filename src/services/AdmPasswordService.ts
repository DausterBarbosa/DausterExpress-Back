import { AppDataSource } from "../data-source";
import Administrator from "../entity/Administrator";
import HttpError from "../erros/HttpError";
import LoginData from "../types/LoginData";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class AdmPasswordService{
    async login(data:LoginData){
        const administratorRepository = AppDataSource.getRepository(Administrator);

        const administrator = await administratorRepository.findOneBy({email: data.email});

        if(!administrator){
            throw new HttpError(404, "Usuário não encontrado.");
        }

        const passwordValid = await bcrypt.compare(data.password, administrator.password_hash);

        if(!passwordValid){
            throw new HttpError(401, "Senha incorreta.");
        }

        const token = jwt.sign({
            id: administrator.id,
        },
        "batinha",
        {
            expiresIn: "5 days"
        });

        return {
            token,
            user: {
                id: administrator.id,
                nome: administrator.nome,
                sobrenome: administrator.sobrenome,
                email: administrator.email,
                telefone: administrator.telefone,
                estado: administrator.estado,
                cidade: administrator.cidade,
                cep: administrator.cep,
                endereco: administrator.endereco,
                numero: administrator.numero,
            }
        };
    }
}

export default new AdmPasswordService();