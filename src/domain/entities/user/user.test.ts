import { User } from './user'

describe('User Entity', () => {
    it('Deve criar um usuario', () => {
        const user = new User('João', 'joao@email.com');
        expect(user.id).toBeDefined()
        expect(user.name).toBe('João')
        expect(user.email).toBe('joao@email.com')
    });

    it('Deve retornar um erro ( nome ausente )', () => {
        expect(() => {
            new User('', 'joao@email.com')
        }).toThrow('nome ausente')
    });

    it('Deve retornar um erro ( email ausente )', () => {
        expect(() => {
            new User('Joao', '')
        }).toThrow('email ausente')
    })
})