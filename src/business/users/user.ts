import { AddUserModel, LoginModel } from '../../models/users'
import { idGenerator, IdGenerator } from '../../services/IdGenerator'
import { hashManager, HashManager } from '../../services/HashManager'
import { BaseError } from '../../models/error'
import { dbUsers, DbUsers } from '../../infra/database/user/user'
import { authenticator, Authenticator } from '../../services/Authenticator'

export class UserBusiness {
    constructor(
        readonly idGenerator: IdGenerator,
        readonly hashManager: HashManager,
        readonly dbUsers: DbUsers,
        readonly authenticator: Authenticator
    ) { }
    async signup(userInput: AddUserModel): Promise<string> {
        Object.values(userInput).forEach(value => {
            if (!value) throw new BaseError('Values can not be empty', 400)
        })
        const validEmail = ['@', '.com']
        validEmail.forEach(element => {
            if (!userInput.email.includes(element))
                throw new BaseError('email not valid')
        })
        if (userInput.password.length < 6)
            throw new BaseError('password not valid, it should have at least 6 characters')
        const userExist = await this.dbUsers.get(userInput.email)
        if(userExist) throw new BaseError('This e-mail already used')

        const hashPassword = await this.hashManager.hash(userInput.password)
        const id = this.idGenerator.generate()
        const user = {
            id: id,
            name: userInput.name,
            email: userInput.email,
            login: userInput.login,
            password: hashPassword
        }
        const result = await this.dbUsers.add(user)
        if(!result) 
            throw new BaseError('Error trying to signup, try again')
            
        return this.authenticator.generateToken({ id })
    }

    async login(loginInput: LoginModel): Promise<string> {

        Object.values(loginInput).forEach(value => {
            if (!value) throw new BaseError('Values can not be empty', 400)
        })
        if (loginInput.password.length < 6)
            throw new BaseError('password not valid, it should have at least 6 characters')

        const validEmail = ['@', '.com']
        validEmail.forEach(element => {
            if (!loginInput.email.includes(element))
                throw new BaseError('email not valid')
        })

        const result = await this.dbUsers.get(loginInput.email)
        if (!result) {
            throw new BaseError('E-mail and password are not valid')
        }
        const validatePassword = await this.hashManager.compare(loginInput.password, result.password)
        if (!validatePassword) throw new BaseError('E-mail and password are not valid')

        const token = this.authenticator.generateToken({ id: result.id })
        return token

    }
}
export const userBusiness = new UserBusiness(idGenerator, hashManager, dbUsers, authenticator)