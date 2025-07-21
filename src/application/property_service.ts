import { IProperty } from "../domain/entities/property/property";
import { IPropertyRepository } from "../domain/interfaces/RepositoryInterface";
import { IPropertyService } from "../domain/interfaces/ServiceInterface";

export class PropertyService implements IPropertyService {
    
    constructor(private repository: IPropertyRepository) {
    }
    
    async create(property: IProperty): Promise<void> {
        await this.repository.save(property)
    }

    async getAll(): Promise<IProperty[]> {
        return await this.repository.getAll()
    }

    async getByName(name: string): Promise<IProperty | undefined> {
        return await this.repository.getByName(name)
    }

    async getById(id: string): Promise<IProperty | undefined> {
        return await this.repository.getById(id)
    }
}