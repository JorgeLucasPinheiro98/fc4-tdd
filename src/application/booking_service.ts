import { IBooking } from "../domain/entities/booking/booking"
import { IBookingRepository } from "../domain/interfaces/RepositoryInterface"
import { IBookingService, IPropertyService, IUserService } from "../domain/interfaces/ServiceInterface"


export class BookingService implements IBookingService {
    
    constructor(
        private repository: IBookingRepository,
        private userService: IUserService,
        private propertyService: IPropertyService
    ) {
    }
    
    async create(booking: IBooking): Promise<void> {
        await this.repository.save(booking)
    }

    async getAll(): Promise<IBooking[]> {
        return await this.repository.getAll()
    }

    async getById(id: string): Promise<IBooking | undefined> {
        return await this.repository.getById(id)
    }
}