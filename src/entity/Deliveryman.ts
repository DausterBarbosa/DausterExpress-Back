import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Deliveryman {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    estado: string;

    @Column()
    cidade: string;

    @Column()
    cep: string;

    @Column()
    endereco: string;

    @Column()
    numero: string;
}