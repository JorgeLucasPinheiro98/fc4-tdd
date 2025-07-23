
import { User } from "../../domain/entities/user/user";
import { IUserRepository } from "../../domain/interfaces/RepositoryInterface";


export class FakeUserRepository implements IUserRepository {
    users: User[] = []
    
    async save(user: User): Promise<void> {
        this.users.push(user)
    }
    
    async getAll(): Promise<User[]> {
        return this.users;
    }
    
    async getByName(name: string): Promise<User | undefined> {
        return this.users.find((user) => user.name === name);
    }
    
    async getById(id: string): Promise<User | undefined> {
        return this.users.find((user) => user.id === id);
    }
}