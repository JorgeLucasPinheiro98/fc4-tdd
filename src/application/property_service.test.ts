import { Property } from "../domain/entities/property/property";
import { FakePropertyRepository } from '../infra/repository/fake_property_repository'
import PropertyService from './property_service'

describe('Property Service', () => {
    let propertyService: PropertyService;
    let propertyRepository: FakePropertyRepository;

    beforeEach(() => {
        propertyRepository = new FakePropertyRepository();
        propertyService = new PropertyService(propertyRepository);
    })

    it('Espero criar e salvar uma property no banco de dados', async () => {
        const property = new Property(
            'Casa na Praia',
            'Uma bela Casa na Praia de São Miguel',
            4,
            200
        );
        await propertyService.create(property);
        const allProperty = await propertyService.getAll();
        const propertyResponse = await propertyService.getById(property.getId());
        expect(allProperty).toBeDefined();
        expect(propertyResponse?.id).toBe(property.id);
    });
});