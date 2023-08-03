import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })

    it('Deve retornar false ao tentar remover um usuário', () => {
        const mockIdUser = 9999;
        const mockConsole = jest.spyOn(global.console, 'log')
        const retorno = userService.deleteUser(mockIdUser);
        expect(retorno).not.toBeTruthy();
        expect(userService.db.length).not.toEqual(0);
        expect(mockConsole).not.toHaveBeenCalledWith('Deletando usuário...', mockIdUser)
    })

    it('Deve remover um usuário', () => {
        const mockIdUser = 1;
        const mockConsole = jest.spyOn(global.console, 'log')
        const retorno = userService.deleteUser(mockIdUser);
        expect(retorno).toBeTruthy();
        expect(userService.db.length).toEqual(0);
        expect(mockConsole).toHaveBeenCalledWith('Deletando usuário...', mockIdUser) 
    })
})
