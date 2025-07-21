import { Property } from '../../domain/entities/property/property';
import { FakePropertyRepository } from './fake_property_repository'


test('Deve criaar e salvar uma property', async() => {
    const fakePropertyRepository = new FakePropertyRepository();
    const property = new Property(
        'Casa na Praia',
        'Uma bela Casa na Praia de São Miguel',
        4,
        200
    );

    await fakePropertyRepository.save(property);
    const getAll = await fakePropertyRepository.getAll();
    const getByName = await fakePropertyRepository.getByName(property.name);
    const getById = await fakePropertyRepository.getById(property.id);
    expect(getAll).toBeDefined();
    expect(getByName).toBe(property);
    expect(getById).toBe(property);
})