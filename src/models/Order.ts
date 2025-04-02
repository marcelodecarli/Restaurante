import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ default: "pending" })
    status!: string;

    @ManyToOne(() => User, (user) => user.orders)
    user!: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items!: OrderItem[];

    constructor(){}
}
