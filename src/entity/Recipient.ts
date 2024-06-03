import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class Recipient {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    nome: string;

    @Column()
    cnpj: string;

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

    @Column()
    complemento: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}