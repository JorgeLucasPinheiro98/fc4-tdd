import { RefunRuleFactory } from "../../cancelation/refund_rule";
import { DateRange } from "../../value_objects/date_range";
import { Property } from "../property/property";
import { User } from "../user/user";

export type IBooking = {
    id: string;
    property: Property;
    user: User;
    dateRange: DateRange;
    guest: number;
    status: "CONFIRMED" | "CANCELLED";
    totalprice: number;
}

export class Booking implements IBooking {
    id: string;
    property: Property;
    user: User;
    dateRange: DateRange;
    guest: number;
    status: "CONFIRMED" | "CANCELLED" = "CONFIRMED"
    totalprice: number

    constructor(property: Property, user: User, dateRange: DateRange, guest: number) {
        this.id = String(Math.floor(Math.random() * 1001))
        this.property = property;
        this.user = user;
        this.dateRange = dateRange;
        this.guest = guest;
        this.status = "CONFIRMED"
        this.totalprice = this.getTotalPrice()
        this.validateGuest();
        this.validateisAvailable()
        
        property.saveBooks(this)
    }

    getId(): string {
        return this.id;
    }

    getProperty(): Property {
        return this.property;
    }

    getUser(): User {
        return this.user;
    }

    getDateRange(): DateRange {
        return this.dateRange;
    }

    getStatus(): "CONFIRMED" | "CANCELLED" {
        return this.status;
    }

    getTotalPrice() {
        return this.property.totalValue(this.dateRange.getTotalNights())
    }

    private validateGuest() {
        if (this.property.getMaxGuests() <= this.guest) {
            throw new Error(`O numero de hospedes deve ser menor ou igual a ${this.property.getMaxGuests()}`)
        }
    }

    private validateisAvailable() {
        if(!this.property.isAvailble(this.dateRange)) {
            throw new Error("A propriedade não está disponível para o período selecionado.")
        }
    }

    cancel(currentDate: Date) {
        if( this.status == "CANCELLED") throw new Error('Reserva já está cancelada')
        this.status = "CANCELLED"

        const checkInDate = this.dateRange.getStartDate();
        const timeDiff = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckin = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const refundRule = RefunRuleFactory.getRefunRule(daysUntilCheckin);
        this.totalprice = refundRule.calculateRefund(this.totalprice)
    }

};