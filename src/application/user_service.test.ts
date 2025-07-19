import userService from './user_service'
import { FakeRepository } from '../infra/repository/fake_user_repository'


describe('User Service', () => {
    let userservice: userService;
    let repository: FakeRepository

    beforeEach(() => {
        repository = new FakeRepository();
        userservice = new userService(repository);
    })

    it('Deve retornar null quando um ID invalido for passado', async () => {
        const user = await userservice.findUserById('999');
        expect(user).toBeNull();
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
        expect(user).not.toBeNull();
        expect(user?.id).toBe('1');
        expect(user?.name).toBe('John Doe')
    });

    it('Deve retornar undefined', async () => {
        const userResponse = await userservice.getByName('John Doe');
        expect(userResponse).toBeNull();
    });
});