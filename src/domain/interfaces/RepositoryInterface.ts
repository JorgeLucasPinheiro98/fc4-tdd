import { IUser } from "../entities/user/user"

export default interface IRepository {
    save(user:IUser): Promise<void>;
    getAll(): Promise<IUser[]>;
    getByName(name: string): Promise<IUser | undefined>;
}