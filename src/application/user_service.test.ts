import UserService from './user_service'

describe('User Service', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService()
    })

    it('Deve retornar null quando um ID invalido for passado', async () => {
        const user = await userService.findUserById('999');
        expect(user).toBeNull();
    });

    it('Deve retornar um usuario quando um ID valido for passado', async () => {
        const user = await userService.findUserById('1');
        expect(user).not.toBeNull();
        expect(user?.id).toBe('1');
        expect(user?.name).toBe('John Doe')
    });
});