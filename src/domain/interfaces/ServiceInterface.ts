import { IBooking } from "../entities/booking/booking";
import { IProperty } from "../entities/property/property";
import { IUser } from "../entities/user/user";

export interface IUserService {
    create(user: IUser): Promise<void>;
    getAll(): Promise<IUser[]>;
    getByName(name: string): Promise<IUser | undefined>
    getById(id: string): Promise<IUser | undefined>
}

export interface IPropertyService {
    create(property: IProperty): Promise<void>;
    getAll(): Promise<IProperty[]>;
    getByName(name: string): Promise<IProperty | undefined>
    getById(id: string): Promise<IProperty| undefined>
}

export interface IBookingService {
    create(booking: IBooking): Promise<void>;
    getAll(): Promise<IBooking[]>;
    getById(id: string): Promise<IBooking| undefined>
}