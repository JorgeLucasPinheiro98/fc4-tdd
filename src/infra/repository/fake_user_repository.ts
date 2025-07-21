import { IUser } from "../../domain/entities/user/user";
import { IUserRepository } from "../../domain/interfaces/RepositoryInterface";


export class FakeUserRepository implements IUserRepository {
    users: IUser[] = []
    
    async save(user: IUser): Promise<void> {
        this.users.push(user)
    }
    
    async getAll(): Promise<IUser[]> {
        return this.users;
    }
    
    async getByName(name: string): Promise<IUser | undefined> {
        return this.users.find((user) => user.name === name);
    }
    
    async getById(id: string): Promise<IUser | undefined> {
        return this.users.find((user) => user.id === id);
    }
}