import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Order from './Order';

@Entity()
export default class Recipient {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @OneToMany(() => Order, order => order.destinatario, {
        onDelete: "CASCADE"
    })
    order: Order[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}