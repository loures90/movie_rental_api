import { SignupUserDB } from "../../../infra/protocols/signup/signup-db";
import { AddUserModel } from "../../../models/users";
import { IdGenerator } from "../../../services/IdGenerator";
import { HashManager } from "../../../services/HashManager";
import { SignupUserDTO } from "../../protocols/users/signup-users-dto";
import { BaseError } from '../../../models/error';

export class DbSignupUsers implements SignupUserDTO{
    constructor(
        readonly idGenerator: IdGenerator,
        readonly signupUserDB: SignupUserDB,
        readonly hashManager: HashManager
    ){}
    async add(userInput: AddUserModel):Promise<Boolean>{
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
        this.signupUserDB.add(user)
        return true
    }
}