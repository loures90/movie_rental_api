import { UsersModel } from '../../../models/users'

export interface SignupUserDB {
    add(user: UsersModel):Promise<Boolean>
}