import { DateRange } from "../../value_objects/date_range";
import { Property } from "../property/property";
import { User } from "../user/user";

export class Booking {
    private id: string;
    private property: Property;
    private user: User;
    private dateRange: DateRange;
    private guest: number;
    private status: "CONFIRMED" | "CANCELED" = "CONFIRMED"
    private totalprice: number

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

    getStatus(): "CONFIRMED" | "CANCELED" {
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

};