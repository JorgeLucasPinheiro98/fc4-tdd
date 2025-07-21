import { IBooking } from "../entities/booking/booking";
import { IProperty } from "../entities/property/property";
import { IUser } from "../entities/user/user"

export interface IUserRepository {
    save(user:IUser): Promise<void>;
    getAll(): Promise<IUser[]>;
    getByName(name: string): Promise<IUser | undefined>;
    getById(id: string): Promise<IUser | undefined>;
}

export interface IPropertyRepository {
    save(property: IProperty): Promise<void>;
    getAll(): Promise<IProperty[]>
    getByName(name: string): Promise<IProperty | undefined>;
    getById(id: string): Promise<IProperty | undefined>;
}

export interface IBookingRepository {
    save(booking: IBooking): Promise<void>;
    getAll(): Promise<IBooking[]>
    getById(id: string): Promise<IBooking | undefined>;
}