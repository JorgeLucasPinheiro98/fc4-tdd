import { Booking } from "../domain/entities/booking/booking";
import { Property } from "../domain/entities/property/property";
import { User } from "../domain/entities/user/user";
import { IPropertyRepository, IUserRepository } from "../domain/interfaces/RepositoryInterface";
import { DateRange } from "../domain/value_objects/date_range";
import { FakeBookingRepository } from '../infra/repository/fake_booking_repository';
import { BookingService } from './booking_service';
import { PropertyService } from './property_service'
import { UserService } from './user_service'

jest.mock("./property_service");
jest.mock('./user_service');

describe('Booking Service', () => {
    let bookingService: BookingService;
    let bookingRepository: FakeBookingRepository;
    let mockPropertyService: jest.Mocked<PropertyService>;
    let mockUserService: jest.Mocked<UserService>;


    beforeEach(() => {
        const mockPropertyRepository = {} as IPropertyRepository;
        const mockUserRepository = {} as IUserRepository;

        mockPropertyService = new PropertyService(
            mockPropertyRepository
        ) as jest.Mocked<PropertyService>;

        mockUserService = new UserService(mockUserRepository) as jest.Mocked<UserService>


        bookingRepository = new FakeBookingRepository();
        bookingService = new BookingService(
            bookingRepository,
            mockPropertyService,
            mockUserService
        );
    })

    it('Espero criar e salvar um booking no banco de dados', async () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const dateRange = new DateRange(new Date('2025-06-15'), new Date('2025-06-20'));
        const booking = new Booking(
            property,
            user,
            dateRange,
            2
        );
        await bookingService.create(booking);
        const allBooking = await bookingService.getAll();
        const bookingResponse = await bookingService.getById(booking.getId());
        expect(allBooking).toBeDefined();
        expect(bookingResponse?.id).toBe(booking.id);
    });
});