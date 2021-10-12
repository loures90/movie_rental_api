import { Request, Response } from "express";
import { userBusiness, UserBusiness } from "../../business/users/user";
export class UserController {
    async signup(req: Request, res: Response) {
        try {
            const { name, email, login, password } = req.body
            const token = await userBusiness.signup({ name, email, login, password })
            res.status(200).send( {token} );
        } catch (error) {
            throw error;
        }
    }

    async login(req: Request, res: Response) {

    }
}
export const userController = new UserController()