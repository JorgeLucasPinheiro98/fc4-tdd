import { Booking } from "../../domain/entities/booking/booking";
import { IBookingRepository } from "../../domain/interfaces/RepositoryInterface";

export class FakeBookingRepository implements IBookingRepository {
    bookings: Booking[] = []
    
    async save(booking: Booking): Promise<void> {
        this.bookings.push(booking)
    }
    
    async getAll(): Promise<Booking[]> {
        return this.bookings;
    }
    
    async getById(id: string): Promise<Booking | undefined> {
        return this.bookings.find((booking) => booking.id === id);
    }
}