import { IUser } from "../entities/user/user";

export default interface IService {
    create(user: IUser): Promise<void>;
    getAll(): Promise<IUser[]>;
    getByName(name: string): Promise<IUser | null>
}