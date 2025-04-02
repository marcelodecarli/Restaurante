import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Dish } from "./Dish";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int" })
    quantity: number;

    @ManyToOne(() => Order, (order) => order.items)
    order!: Order;

    @ManyToOne(() => Dish, (dish) => dish.orderItems)
    dish!: Dish;

    constructor(quantity: number) {
        this.quantity = quantity;
    }
}