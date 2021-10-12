import { UsersModel } from '../../../models/users'

export interface GetUserDB {
    get(email: string):Promise<Pick<UsersModel, 'id' | 'password' >>
}