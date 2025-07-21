import { DateRange } from "../../value_objects/date_range";
import {Booking } from "../booking/booking";

export type IProperty = {
    id: string;
    name: string;
    description: string;
    maxGuest: number;
    basePrice: number;
}

export class Property implements IProperty{
    id: string;
    private books: Booking[] = []

    constructor(readonly name: string, readonly description: string, readonly maxGuest: number, readonly basePrice: number) {

        this.id = String(Math.floor(Math.random() * 101));
        this.name = name;
        this.description = description;
        this.maxGuest = maxGuest;
        this.basePrice = basePrice;
        this.validate(name, description, maxGuest, basePrice)
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getMaxGuests() {
        return this.maxGuest;
    }

    getBasePricePerNight() {
        return this.basePrice;
    }

    totalValue(nights: number) {
        if (nights >= 7) {
            let totalValues = nights * this.basePrice
            totalValues *= 0.95;
            return totalValues
        }
        return nights * this.basePrice
    }

    isAvailble(dateRange: DateRange): boolean {
        return !this.books.some(
            (book) =>
                book.getStatus() === "CONFIRMED" && book.getDateRange().overlaps(dateRange)
        )
    }

    saveBooks(book: Booking): void {
        this.books.push(book);
    }

    getBooks() {
        return this.books;
    }

    private validate(name: string, description: string, maxGuest: number, basePrice: number) {
        if(!name) {
            throw new Error('nome ausente');
        }
        if(!description) {
            throw new Error('descrição ausente');
        }
        if(!maxGuest) {
            throw new Error('maximo de hospedes ausente');
        }
        if(!basePrice) {
            throw new Error('preço inicial ausente');
        }
    }
} 