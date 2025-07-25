export class DateRange {
    private readonly dateStart: Date;
    private readonly dateEnd: Date;
    constructor( dateStart: Date, dateEnd: Date) {
        this.validateDates(dateStart, dateEnd)
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    getTotalNights(): number {
        const diffTime = this.dateEnd.getTime() - this.dateStart.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }

    getStartDate(): Date {
        return this.dateStart;
    }

    getEndDate(): Date {
        return this.dateEnd;
    }

    overlaps(date: DateRange): boolean {
        return this.dateStart <= date.dateEnd && date.getStartDate() <= this.dateEnd;
    }

    private validateDates(dateStart: Date, dateEnd: Date) {
        if( dateStart >= dateEnd) {
            throw new Error('A data de término deve ser posterior à data de início.')
        }
    }
}