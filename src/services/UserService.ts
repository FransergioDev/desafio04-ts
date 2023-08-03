export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    deleteUser = (id: number): boolean => {
        const index = id-1;
        if (this.db[index] !== null && this.db[index] !== undefined) {
            this.db = this.db.slice(id, 1);
            console.log('Deletando usuário...', id) 
            return true;
        } else return false;
    }
}

