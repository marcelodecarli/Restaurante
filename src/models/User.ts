import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";
import { FavoriteDishes } from "./FavoriteDishes";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ unique: true, type: "varchar", length: 255, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 15, nullable: false, unique: true })
  phone: string;

  @Column({ default: "costumer", type: "enum", enum: ['costumer', 'admin'] })
  role!: string;

  @OneToMany (() => FavoriteDishes, (favoriteDish) => favoriteDish.user)
  favoritDish!: FavoriteDishes[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  constructor(name: string, email: string, password: string, phone: string){
    this.name = name
    this.email = email
    this.password = password
    this.phone = phone
  }
}