import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockListUsers = [
        {
            name: "Joana",
            email: "joana@dio.com",
        },
        {
            name: "Pedro",
            email: "pedro@dio.com",
        },
        {
            name: "Ana",
            email: "ana@dio.com",
        },
    ];

    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue(mockListUsers)
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar erro na tentativa de adicionar um novo usuário com campo nome inválido', () => {
        const mockRequest = {
            body: {
                name: null,
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })


    it('Deve retornar erro na tentativa de adicionar um novo usuário com campo e-mail inválido', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: null
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! E-mail obrigatório' })
    })


    it('Deve retornar uma lista de usuários', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse();
        const mockUserServiceSpyOn = jest.spyOn(mockUserService, 'getAllUsers');
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).not.toBeNull();
        expect(mockUserServiceSpyOn).toHaveBeenCalled();
        expect(mockResponse.state.json).toMatchObject(mockListUsers);
    })
})
