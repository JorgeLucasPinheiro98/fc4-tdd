import { DateRange } from './date_range'

describe('DateRange Value Object', () => {

    it('Deve lançar um erro se a data de término for antes da data de inicio', () => { 
        expect(() => {
        new DateRange(new Date('2025-06-25'), new Date('2025-06-20'));
        }).toThrow('A data de t´rmino deve ser posterior à data de início.');
    });

    it('Deve criar uma instancia de e retornar a data inicial e a data final', () => {
        const startDate = new Date('2025-06-20')
        const endDate = new Date('2025-06-25')
        const dateRange = new DateRange(startDate, endDate);
        expect(dateRange.getStartDate()).toBe(startDate);
        expect(dateRange.getEndDate()).toBe(endDate);
    });

    it('Deve calcular o total de noites correspondente', () => {
        const startDate = new Date('2025-06-20')
        const endDate = new Date('2025-06-25')
        const dateRange = new DateRange(startDate, endDate);

        const totalnight = dateRange.getTotalNights();
        expect(totalnight).toBe(5);

        const startDate1 = new Date('2025-06-10')
        const endDate1 = new Date('2025-06-25')
        const dateRange1 = new DateRange(startDate1, endDate1);

        const totalnight1 = dateRange1.getTotalNights();
        expect(totalnight1).toBe(15);
    })

    it('Deve verificar se duas datas colidem', () => {
        const startDate = new Date('2025-06-20')
        const endDate = new Date('2025-06-25')
        const dateRange = new DateRange(startDate, endDate);

        const startDate1 = new Date('2025-06-10')
        const endDate1 = new Date('2025-06-25')
        const dateRange1 = new DateRange(startDate1, endDate1);

        expect(dateRange.overlaps(dateRange1)).toBe(true);
    })
});