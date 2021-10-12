import { IdGenerator, idGenerator } from '../../../services/IdGenerator'
import { fixAddUser } from '../../../_fixtures/users'
import { DbSignupUsers } from './signup-user'
import { SignupUserDB } from "../../../infra/protocols/signup/signup-db";
import { UsersModel } from '../../../models/users';
import { BaseError } from '../../../models/error';
import { HashManager } from '../../../services/HashManager';


class IdGeneratorStub implements IdGenerator {
    generate(): string {
        return 'abc123'
    }
}
const idGeneratorStub = new IdGeneratorStub()

class SignupUserDBStub implements SignupUserDB {
    add(user: UsersModel): Promise<Boolean> {
        return Promise.resolve(true)
    }
}
const signupUserDBStub = new SignupUserDBStub()

class HashManagerStub implements HashManager {
    async hash(text: string): Promise<string> {
        return Promise.resolve('password')
    }
    public async compare(text: string, hash: string): Promise<boolean>{
        return Promise.resolve(true)
    }
}
const hashManagerStub = new HashManagerStub()

const dbSignupUsersStup = new DbSignupUsers(idGeneratorStub, signupUserDBStub, hashManagerStub)

describe('USER', () => {
    test('It should create an user', async () => {
        const result = await dbSignupUsersStup.add(fixAddUser)
        expect(result).toBe(true)
    })
    test('It should check if some input is empty valid', async () => {
        const result = dbSignupUsersStup.add({
            name: '',
            login: 'any_login',
            email: 'any_email@email.com',
            password: 'any_password',
        })
        await expect(result).rejects.toThrowError(BaseError)
    })
    test('It should check if email is not valid', async () => {
        const result = dbSignupUsersStup.add({
            name: 'any_name',
            login: 'any_login',
            email: 'any_emailemail.com',
            password: 'any_password',
        })
        await expect(result).rejects.toThrowError(BaseError)
    })
    test('It should check if password is not valid', async () => {
        const result = dbSignupUsersStup.add({
            name: 'any_name',
            login: 'any_login',
            email: 'any_emailemail.com',
            password: 'any_',
        })
        await expect(result).rejects.toThrowError(BaseError)
    })
    test('It should call hashPassword with correct values', async () => {
        const hashSpy = jest.spyOn(hashManagerStub, 'hash')
        await dbSignupUsersStup.add(fixAddUser)
        expect(hashSpy).toHaveBeenCalledWith(fixAddUser.password)
    })
    test('It should call signupUserDB with correct values', async () => {
        const signupDBSpy = jest.spyOn(signupUserDBStub, 'add')
        await dbSignupUsersStup.add(fixAddUser)
        expect(signupDBSpy).toHaveBeenCalledWith({ ...fixAddUser, password: 'password', id: 'abc123' })
    })
})