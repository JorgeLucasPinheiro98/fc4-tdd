import { IPropertyRepository, IUserRepository } from "../domain/interfaces/RepositoryInterface";
import { FakeBookingRepository } from '../infra/repository/fake_booking_repository';
import { BookingService } from './booking_service';
import { PropertyService } from './property_service'
import { UserService } from './user_service'
import { CreateBookingDTO } from './dtos/create_booking_dto'

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
            mockUserService,
            mockPropertyService
        );
    })

    it('Deve criar uma reserva com sucesso usando repositorio fake', async () => {
        const mockProperty = {
            getId: jest.fn().mockReturnValue('1'),
            isAvailable: jest.fn().mockReturnValue(true),
            validateGuestCount: jest.fn(),
            calculateTotalPrice: jest.fn().mockReturnValue(500),
            addBooking: jest.fn(),
        } as any;

        const mockUser = {
            getId: jest.fn().mockReturnValue('1'),
        } as any;

        mockPropertyService.getById.mockResolvedValue(mockProperty);
        mockUserService.getById.mockResolvedValue(mockUser);

        const bookingDTO: CreateBookingDTO = {
            propertId: '1',
            guestId: '1',
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-06-10'),
            guestCount: 2,
        };

        const result = await bookingService.createBooking   (bookingDTO);

        expect(result).toBeDefined();
        expect(result.getStatus()).toBe('CONFIRMED')
        expect(result.getTotalPrice()).toBe(500);
    });
});