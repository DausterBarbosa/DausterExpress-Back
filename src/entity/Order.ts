import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

import Deliveryman from "./Deliveryman";
import Recipient from "./Recipient";
import Problem from "./Problem";

@Entity()
export default class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Deliveryman, entregador => entregador.order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    entregador: Deliveryman;

    @ManyToOne(() => Recipient, destinatario => destinatario.order, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    destinatario: Recipient;

    @Column()
    status: string;
    
    @Column()
    encomenda: string;

    @OneToMany(() => Problem, problema => problema.encomenda)
    problemas: Problem[];

    @Column({ type: 'varchar', nullable: true })
    description_problem: string;

    @Column({ type: 'varchar', nullable: true }) 
    imagem_url: string | null;

    @Column({ type: 'timestamp', nullable: true }) 
    data_retirada: Date | null;

    @Column({ type: 'timestamp', nullable: true }) 
    data_entrega: Date | null;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}