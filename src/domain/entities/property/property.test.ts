import { Property } from './property'
import { DateRange } from '../../value_objects/date_range'

describe('Teste Entity Property', () => {
    it('Deve criar uma instância de Property com todos os atributos', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        expect(property.getId()).toBe(property.id);
        expect(property.getName()).toBe('Casa na Praia');
        expect(property.getDescription()).toBe('Uma bela Casa na Praia de São Miguel');
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    });

    it('Deve retornar um erro - nome ausente -', () => {
        expect(() => {
            new Property(
            '',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
            );
        }).toThrow('nome ausente');
    });

    it('Deve retornar um erro - descrição ausente -', () => {
        expect(() => {
            new Property(
            'Casa de Praia',
            '',
            4,
            200
            );
        }).toThrow('descrição ausente');
    });

    it('Deve retornar um erro - maximo de hospedes ausente -', () => {
        expect(() => {
            new Property(
            'Casa de Praia',
            'Uma bela Casa na Praia de São Miguel',
            0,
            200
            );
        }).toThrow('maximo de hospedes ausente');
    });

    it('Deve retornar um erro - preço inicial ausente -', () => {
        expect(() => {
            new Property(
            'Casa de Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            0
            );
        }).toThrow('preço inicial ausente');
    });

    it('Deve aplicar um desconto se a reserva tiver mais de 7 dias', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );

        const dateRange = new DateRange(new Date('2025-06-20'), new Date('2025-06-27'));
        const nights = dateRange.getTotalNights();
        expect(property.totalValue(nights)).toBe(1330)
        
    });

    it('Deve calcular o valor da total', () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );

        const dateRange = new DateRange(new Date('2025-06-20'), new Date('2025-06-25'));
        const nights = dateRange.getTotalNights();
        expect(property.totalValue(nights)).toBe(1000);
    });
}) ;