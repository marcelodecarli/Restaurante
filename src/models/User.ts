// src/models/User.ts
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
  BeforeInsert, BeforeUpdate
} from "typeorm";
import bcrypt from "bcryptjs";
import { Order } from "./Order";
import { FavoriteDishes } from "./FavoriteDishes";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "varchar", length: 15 })
  phone!: string;

  @Column({ default: "customer" })
  role!: string;

  @OneToMany (() => FavoriteDishes, (favoriteDish) => favoriteDish.user)
  favoritDish!: FavoriteDishes[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  constructor(name: string, email: string, password: string, phone: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}