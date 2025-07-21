import { Booking } from '../../domain/entities/booking/booking';
import { Property } from '../../domain/entities/property/property';
import { User } from '../../domain/entities/user/user';
import { DateRange } from '../../domain/value_objects/date_range';
import { FakeBookingRepository } from './fake_booking_repository';


test('Deve criaar e salvaar um Booking', async() => {
    const fakeRepository = new FakeBookingRepository();
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

    await fakeRepository.save(booking);
    const getAll = await fakeRepository.getAll();
    const getById = await fakeRepository.getById(booking.getId());
    expect(getAll).toBeDefined();
    expect(getById).toBe(booking);
})