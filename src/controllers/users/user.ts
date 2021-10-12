import { SignupUserDTO } from "../../data/protocols/users/signup-users-dto"
import { idGenerator } from "../../services/IdGenerator"
import { Request, Response } from "express";
import { DbSignupUsers } from "../../data/useCases/users/signup-user";
import { DbUsers } from "../../data/infra/database/signup-user/user";
export class UserController {
    constructor(
        private readonly signupUserDTO: SignupUserDTO
    ){}
    async signup(req: Request, res: Response){
        if(!req.body)
            throw new Error('body not valid');
        const {name, email, login, password} = req.body
        return this.signupUserDTO.add({name, email, login, password})
    }

    async login(req: Request, res: Response){
        
    }
}
const signupUserDB = new DbUsers
const signupUserDTO = new DbSignupUsers(idGenerator, signupUserDB)
export const userController = new UserController(signupUserDTO)