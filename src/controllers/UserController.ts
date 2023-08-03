import { Request, Response } from 'express'
import { User, UserService } from '../services/UserService'

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }

    createUser = (request: Request, response: Response): Response => {
        const user: User = request.body

        if(!user.name){
            return response.status(400).json({ message: 'Bad request! Name obrigatório'})
        }
        
        if(!user.email){
            return response.status(400).json({ message: 'Bad request! E-mail obrigatório'})
        }

        this.userService.createUser(user.name, user.email)
        return response.status(201).json({ message: 'Usuário criado'})
    }

    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers()
        return response.status(200).json( users )
    }

    deleteUser = (request: Request, response: Response) => {
        const userId: number = parseInt(request.params.id);
        const userIsDeleted = this.userService.deleteUser(userId);
        return (userIsDeleted) ? response.status(200).json({ message: 'Usuário deletado'}) : response.status(400).json({ message: 'Não foi possível deletar usuário'})
    }
}
