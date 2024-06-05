import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import Deliveryman from "./Deliveryman";
import Recipient from "./Recipient";

@Entity()
export default class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Deliveryman, entregador => entregador.order)
    entregador: Deliveryman;

    @ManyToOne(() => Recipient, destinatario => destinatario.order)
    destinatario: Recipient;

    @Column()
    status: string;
    
    @Column()
    encomenda: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}