import { Property } from "../../domain/entities/property/property";
import { IPropertyRepository } from "../../domain/interfaces/RepositoryInterface";


export class FakePropertyRepository implements IPropertyRepository {
    properts: Property[] = [];
    
    async save(property: Property): Promise<void> {
        this.properts.push(property);
    }
    
    async getAll(): Promise<Property[]> {
        return this.properts;
    }
    
    async getByName(name: string): Promise<Property | undefined> {
        return this.properts.find((property) => property.name === name);
    }
    
    async getById(id: string): Promise<Property | undefined> {
        return this.properts.find((property) => property.id === id);
    }
}