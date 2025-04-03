import { PassThrough } from "stream";
import { AppDataSource } from "../data-source"
import { User }  from "../models/User"

export class UserRepository {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(name: string, email: string, password: string, phone: string){
        const user = new User(name, email, password, phone)
        return await this.userRepository.save(user);
    }

}