import { Booking } from "../domain/entities/booking/booking"
import { IBookingRepository } from "../domain/interfaces/RepositoryInterface"
import { IBookingService, IPropertyService, IUserService } from "../domain/interfaces/ServiceInterface"
import { DateRange } from "../domain/value_objects/date_range";
import { CreateBookingDTO } from "./dtos/create_booking_dto"


export class BookingService {
    
    constructor(
        private readonly repository: IBookingRepository,
        private readonly userService: IUserService,
        private readonly propertyService: IPropertyService
    ) {
    }
    
    async createBooking(dto: CreateBookingDTO): Promise<Booking> {
        const property = await this.propertyService.getById(dto.propertId);

        if (!property) {
            throw new Error('Propriedade não encontrada.');
        }

        const guest = await this.userService.getById(dto.guestId);

        if (!guest) {
            throw new Error('Usuario não encontrado.');
        }

        const dateRange = new DateRange(dto.startDate, dto.endDate);

        const booking = new Booking(
            property,
            guest,
            dateRange,
            dto.guestCount
        )

        await this.repository.save(booking)
        return booking;
    }
    
}