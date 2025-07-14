import { DateRange } from "../../value_objects/date_range";
import { Property } from "../property/property";
import { User } from "../user/user";

export class Booking {
    private id: string;
    private property: Property;
    private user: User;
    private dateRange: DateRange;
    private guest: number;

    constructor(id: string, property: Property, user: User, dateRange: DateRange, guest: number) {
        this.id = id;
        this.property = property;
        this.user = user;
        this.dateRange = dateRange;
        this.guest = guest
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
}