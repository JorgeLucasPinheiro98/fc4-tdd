import { DateRange } from "../../value_objects/date_range";
import { Property } from "../property/property";
import { User } from "../user/user";

export class Booking {
    private id: string;
    private property: Property;
    private user: User;
    private dateRange: DateRange;
    private guest: number;
    private status: "CONFIRMED" | "CANCELLED" = "CONFIRMED"
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
        this.status = "CANCELLED"

        const checkInDate = this.dateRange.getStartDate();
        const timeDiff = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckin = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if(daysUntilCheckin > 7){
           return this.totalprice = 0;
        }

        if(daysUntilCheckin <= 7 && daysUntilCheckin > 1){
           return this.totalprice = daysUntilCheckin * ;
        }
    }

};