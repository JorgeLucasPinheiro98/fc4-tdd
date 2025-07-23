import { Booking } from "../entities/booking/booking";
import { Property } from "../entities/property/property";
import { User } from "../entities/user/user";

export interface IUserService {
    create(user: User): Promise<void>;
    getAll(): Promise<User[]>;
    getByName(name: string): Promise<User | undefined>
    getById(id: string): Promise<User | undefined>
}

export interface IPropertyService {
    create(property: Property): Promise<void>;
    getAll(): Promise<Property[]>;
    getByName(name: string): Promise<Property | undefined>
    getById(id: string): Promise<Property| undefined>
}

export interface IBookingService {
    create(booking: Booking): Promise<void>;
    getAll(): Promise<Booking[]>;
    getById(id: string): Promise<Booking| undefined>;
    getTotalPrice(): Promise<number>;
    getStatus(): Promise<"CONFIRMED" | "CANCELLED">;
}