import { IUser } from "../../domain/entities/user/user";
import IRepository from "../../domain/interfaces/RepositoryInterface";

export class FakeRepository implements IRepository {
    users: IUser[] = []

    async save(user: IUser): Promise<void> {
        this.users.push(user)
    }

    async getAll(): Promise<IUser[]> {
        return this.users;
    }

    async getByName(name: string): Promise<IUser | undefined> {
        return this.users.find((user) => user.name === name)
    }
    
}