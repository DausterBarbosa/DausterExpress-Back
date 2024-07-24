import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne,  } from 'typeorm';

import Order from "./Order";

@Entity()
export default class Problem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Order, entrega => entrega.problemas)
    encomenda: Order;

    @Column()
    descricao: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}