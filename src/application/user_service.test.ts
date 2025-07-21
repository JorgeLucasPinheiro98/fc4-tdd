import userService from './user_service'
import { FakeUserRepository } from '../infra/repository/fake_user_repository'


describe('User Service', () => {
    let userservice: userService;
    let repository: FakeUserRepository

    beforeEach(() => {
        repository = new FakeUserRepository();
        userservice = new userService(repository);
    })

    it('Deve retornar null quando um ID invalido for passado', async () => {
        const user = await userservice.getById('999');
        expect(user).toBeUndefined();
    });

    it('Deve retornar um usuario quando um ID valido for passado', async () => {
        const user = {
            id: '1',
            name: 'John Doe',
            email: 'john@email.com'
        }
        await userservice.create(user)
        const allUser = await userservice.getAll()
        const userResponse = await userservice.getByName('John Doe');
        expect(allUser).toBeDefined()
        expect(userResponse).not.toBeUndefined();
        expect(userResponse?.id).toBe('1');
        expect(userResponse?.name).toBe('John Doe')
    });

    it('Deve retornar undefined', async () => {
        const userResponse = await userservice.getByName('John Doe');
        expect(userResponse).toBeUndefined();
    });
});