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
            property,
            user,
            dateRange,
            2
        );
        expect(booking.getId()).toBeDefined();
        expect(booking.getProperty()).toBe(property);
        expect(booking.getUser()).toBe(user);
        expect(booking.getDateRange()).toBe(dateRange);
        expect(booking.getStatus()).toBeDefined();
        

    });

    it('Deve criar uma reserva com sucesso e retornar o valor', () => {
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
        expect(booking.getId()).toBeDefined();
        expect(booking.getTotalPrice()).toBe(property.totalValue(dateRange.getTotalNights()))
        

    });

    it('Deve criar uma reserva com sucesso e salvar no banco de dados', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const user2 = new User('Jose', 'Joseo@email.com');
        const dateRange = new DateRange(new Date('2025-06-15'), new Date('2025-06-20'));
        const dateRange2 = new DateRange(new Date('2025-06-22'), new Date('2025-06-25'));
        const booking = new Booking(
            property,
            user,
            dateRange,
            2
        );
        const booking2 = new Booking(
            property,
            user2,
            dateRange2,
            3
        );
        expect(booking.getId()).toBeDefined();
        expect(booking2.getId()).toBeDefined();
        expect(property.getBooks().length).toBe(2);
    });

    it('Não deve criar uma reserva com sucesso e salvar no banco de dados', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const user2 = new User('Jose', 'Joseo@email.com');
        const dateRange = new DateRange(new Date('2025-06-15'), new Date('2025-06-20'));
        const dateRange2 = new DateRange(new Date('2025-06-18'), new Date('2025-06-23'));
        const booking = new Booking(
            property,
            user,
            dateRange,
            2
        );
        expect(() => {
            new Booking(
            property,
            user,
            dateRange2,
            3
        );
        }).toThrow("A propriedade não está disponível para o período selecionado.")
    });

    it('Deve retornar um erro (O numero de hospedes deve ser maior ou igual a ---)', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const dateRange = new DateRange(new Date('2025-06-10'), new Date('2025-06-12'));
        expect(() => {
            new Booking(
            property,
            user,
            dateRange,
            6
        );
        }).toThrow(`O numero de hospedes deve ser menor ou igual a ${property.maxGuest}`);
    });

    it('Deve cancelar uma reserva sem reembolso quando faltam menos de 1 dia para o check-in', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const dateRange = new DateRange(new Date('2025-06-20'), new Date('2025-06-22'));
        const booking = new Booking(property, user, dateRange, 2);
        const currentDate = new Date("2025-06-21");
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe("CANCELLED");
        expect(booking.getTotalPrice()).toBe(400);

    })

    it('Deve cancelar uma reserva com reembolso quando faltam mais de 1 dia para o check-in', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const dateRange = new DateRange(new Date('2025-06-20'), new Date('2025-06-22'));
        const booking = new Booking(property, user, dateRange, 2);
        const currentDate = new Date("2025-06-10");
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe("CANCELLED");
        expect(booking.totalprice).toBe(0);

    })

    it('Deve cancelar uma reserva com reembolso parcial quando a data estiver entre 1 e 7 dias antes do check-in', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const dateRange = new DateRange(new Date('2025-06-20'), new Date('2025-06-22'));
        const booking = new Booking(property, user, dateRange, 2);
        const currentDate = new Date("2025-06-14");
        booking.cancel(currentDate);

        expect(booking.getStatus()).toBe("CANCELLED");
        expect(booking.totalprice).toBe(200);
    })

    it('Não deve cancelar uma reserva que já esta cancelada', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        const user = new User('João', 'joao@email.com');
        const dateRange = new DateRange(new Date('2025-06-20'), new Date('2025-06-22'));
        const booking = new Booking(property, user, dateRange, 2);
        const currentDate = new Date("2025-06-14");
        booking.cancel(currentDate);

        expect(() => {
            booking.cancel(currentDate);
        }).toThrow('Reserva já está cancelada')
    })
});

