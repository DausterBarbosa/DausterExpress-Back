import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

import Order from "./Order";

@Entity()
export default class Problem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    encomenda: Order;

    @Column()
    descricao: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}