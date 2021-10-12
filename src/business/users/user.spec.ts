import { IdGenerator } from '../../services/IdGenerator'
import { fixAddUser } from '../../_fixtures/users'
import { UsersModel } from '../../models/users';
import { BaseError } from '../../models/error';
import { HashManager } from '../../services/HashManager';
import { DbUsers } from '../../infra/database/user/user';
import { AuthenticationData, Authenticator } from '../../services/Authenticator';
import { UserBusiness } from './user';


class IdGeneratorStub implements IdGenerator {
    generate(): string {
        return 'abc123'
    }
}
const idGeneratorStub = new IdGeneratorStub()

class DbUsersStub extends DbUsers {
    add(user: UsersModel): Promise<Boolean> {
        return Promise.resolve(true)
    }
}
const dbUsersStub = new DbUsersStub()

class HashManagerStub implements HashManager {
    async hash(text: string): Promise<string> {
        return Promise.resolve('hash_password')
    }
    public async compare(text: string, hash: string): Promise<boolean>{
        return Promise.resolve(true)
    }
}
const hashManagerStub = new HashManagerStub()

class AuthenticatorStub implements Authenticator {
    public generateToken(input: AuthenticationData, expiresIn: 'any'): string {
        return 'token'
    }
    public getData(token: string): AuthenticationData {
        return { id: 'abc123' }
    }
}
const authenticatorStub = new AuthenticatorStub()

const userBusinessStub = new UserBusiness(idGeneratorStub, hashManagerStub, dbUsersStub, authenticatorStub)

describe('USER', () => {
    test('It should create an user', async () => {
        const result = await userBusinessStub.signup(fixAddUser)
        expect(result).toBe('token')
    })
    test('It should check if some input is empty valid', async () => {
        const result = userBusinessStub.signup({
            name: '',
            login: 'any_login',
            email: 'any_email@email.com',
            password: 'any_password',
        })
        await expect(result).rejects.toThrowError(BaseError)
    })
    test('It should check if email is not valid', async () => {
        const result = userBusinessStub.signup({
            name: 'any_name',
            login: 'any_login',
            email: 'any_emailemail.com',
            password: 'password',
        })
        await expect(result).rejects.toThrowError(BaseError)
    })
    test('It should check if password is not valid', async () => {
        const result = userBusinessStub.signup({
            name: 'any_name',
            login: 'any_login',
            email: 'any_emailemail.com',
            password: 'any_',
        })
        await expect(result).rejects.toThrowError(BaseError)
    })
    test('It should call hashPassword with correct values', async () => {
        const hashSpy = jest.spyOn(hashManagerStub, 'hash')
        await userBusinessStub.signup(fixAddUser)
        expect(hashSpy).toHaveBeenCalledWith(fixAddUser.password)
    })
    test('It should call dbUsers with correct values', async () => {
        const signupSpy = jest.spyOn(dbUsersStub, 'add')
        await userBusinessStub.signup(fixAddUser)
        expect(signupSpy).toHaveBeenCalledWith({ ...fixAddUser, password: 'hash_password', id: 'abc123' })
    })
})