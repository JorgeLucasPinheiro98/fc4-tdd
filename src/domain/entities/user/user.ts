export interface IUser{
    id: string;
    name: string;
    email: string;
}

export class User implements IUser{
    id: string;
    name: string;
    email: string;
    
    constructor(name: string, email: string) {
        this.id = String(Math.floor(Math.random() * 101));
        this.validateParams(name, email)
        this.name = name;
        this.email = email;
        
    }

    private validateParams(name: string, email: string) {
        if(!name) {
            throw new Error('nome ausente')
        }

        if(!email) {
            throw new Error('email ausente')
        }
    }
}