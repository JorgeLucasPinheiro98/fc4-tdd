import { FakeUserRepository } from './fake_user_repository'

test('Deve criaar e salvar um user', async() => {
    const fakeRepository = new FakeUserRepository();
    const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@email.com'
    }

    fakeRepository.save(user);
    const getAll = await fakeRepository.getAll();
    const getByName = await fakeRepository.getByName(user.name)
    expect(getAll).toBeDefined();
    expect(getByName).toBe(user);
})