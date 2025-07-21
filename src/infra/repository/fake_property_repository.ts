import { IProperty } from "../../domain/entities/property/property";
import { IPropertyRepository } from "../../domain/interfaces/RepositoryInterface";


export class FakePropertyRepository implements IPropertyRepository {
    properts: IProperty[] = [];
    
    async save(property: IProperty): Promise<void> {
        this.properts.push(property);
    }
    
    async getAll(): Promise<IProperty[]> {
        return this.properts;
    }
    
    async getByName(name: string): Promise<IProperty | undefined> {
        return this.properts.find((property) => property.name === name);
    }
    
    async getById(id: string): Promise<IProperty | undefined> {
        return this.properts.find((property) => property.id === id);
    }
}