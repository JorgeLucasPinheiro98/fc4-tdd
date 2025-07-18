import { IUser } from "../entities/user/user";

export default interface IService {
    create(user: IUser): void
    getAll(): IUser[];
    getByName(name: string): IUser | undefined;
}