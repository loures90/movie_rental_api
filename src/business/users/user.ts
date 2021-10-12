import { AddUserModel } from "../../models/users";
import { idGenerator, IdGenerator } from "../../services/IdGenerator";
import { hashManager, HashManager } from "../../services/HashManager";
import { BaseError } from '../../models/error';
import { dbUsers, DbUsers } from "../../infra/database/user/user";
import { authenticator, Authenticator } from "../../services/Authenticator";

export class UserBusiness{
    constructor(
        readonly idGenerator: IdGenerator,
        readonly hashManager: HashManager,
        readonly dbUsers: DbUsers,
        readonly authenticator: Authenticator
    ){}
    async signup(userInput: AddUserModel):Promise<string>{
        Object.values(userInput).forEach(value => {
            if(!value) throw new BaseError('Values can not be empty',400)            
        });
        const validEmail = ['@', '.com']          
        validEmail.forEach(element => { 
            if(!userInput.email.includes(element))
                throw new BaseError('email not valid');
        })
        if(userInput.password.length < 6)
            throw new BaseError('password not valid, it should have at least 6 characters');

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
        
        const token  = result && this.authenticator.generateToken({ id })
        return token
    }
}
export const userBusiness = new UserBusiness(idGenerator, hashManager, dbUsers, authenticator);