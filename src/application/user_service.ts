import { IUser, User } from "../domain/entities/user/user";
import IRepository from "../domain/interfaces/RepositoryInterface";
import IService from "../domain/interfaces/ServiceInterface";

export default class userService implements IService {
    
    constructor(private repository: IRepository) {

    }
    async create(user: IUser): Promise<void> {
        await this.repository.save(user)
    }

    async getAll(): Promise<IUser[]> {
        const users = await this.repository.getAll()
        return users
    }

    async getByName(name: string): Promise<IUser | null> {
        const user = await this.repository.getByName(name)
        if(!user)return null
        return user
    }

    async findUserById(id: string): Promise<User | null> {
        return null;
    }
}