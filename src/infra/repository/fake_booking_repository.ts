import { IBooking } from "../../domain/entities/booking/booking";
import { IBookingRepository } from "../../domain/interfaces/RepositoryInterface";

export class FakeBookingRepository implements IBookingRepository {
    bookings: IBooking[] = []
    
    async save(booking: IBooking): Promise<void> {
        this.bookings.push(booking)
    }
    
    async getAll(): Promise<IBooking[]> {
        return this.bookings;
    }
    
    async getById(id: string): Promise<IBooking | undefined> {
        return this.bookings.find((booking) => booking.id === id);
    }
}