import { DateRange } from '../../value_objects/date_range';
import { Property } from '../property/property';
import { User } from '../user/user';
import { Booking } from './booking';

describe('Teste Entity Booking', () => {
    it('Deve criar uma reserva com sucesso', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const dateRange = new DateRange(new Date('2025-06-15'), new Date('2025-06-20'));
        const booking = new Booking(
            '1',
            property,
            user,
            dateRange,
            2
        );

        expect(booking.getId()).toBe('1');
        expect(booking.getProperty()).toBe(property);
        expect(booking.getUser()).toBe(user);
        expect(booking.getDateRange()).toBe(dateRange);
    });

});