import { Dish } from "./Dish";
import { User } from "./User";
import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()

export class FavoriteDishes {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.favoritDish)
    user!: User

    @ManyToOne(() => Dish, (dish) => dish.favoritDish)
    dish!: Dish
}