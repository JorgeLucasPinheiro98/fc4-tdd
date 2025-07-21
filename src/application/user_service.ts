import { IUser} from "../domain/entities/user/user";
import { IUserRepository } from "../domain/interfaces/RepositoryInterface";
import { IUserService } from "../domain/interfaces/ServiceInterface";

export class UserService implements IUserService {
    
    constructor(private repository: IUserRepository) {

    }
    async create(user: IUser): Promise<void> {
        await this.repository.save(user)
    }

    async getAll(): Promise<IUser[]> {
        const users = await this.repository.getAll()
        return users
    }

    async getByName(name: string): Promise<IUser | undefined> {
        return await this.repository.getByName(name)
    }

    async getById(id: string): Promise<IUser | undefined> {
        return await this.repository.getById(id)
    }
}