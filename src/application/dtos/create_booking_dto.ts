export interface CreateBookingDTO {
    propertId: string;
    guestId: string;
    startDate: Date;
    endDate: Date;
    guestCount: number;
}