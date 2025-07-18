import { IUser, User } from "../domain/entities/user/user";
import IRepository from "../domain/interfaces/RepositoryInterface";
import IService from "../domain/interfaces/ServiceInterface";

export default class userService implements IService {
    
    constructor(private repository: IRepository) {

    }
    create(user: IUser): void {
        this.repository.save(user)
    }

    getAll(): IUser[] {
        const users = this.repository.getAll()
        return users
    }

    getByName(name: string): IUser | undefined {
        throw new Error("Method not implemented.");
    }

    async findUserById(id: string): Promise<User | null> {
        return null;
    }
}