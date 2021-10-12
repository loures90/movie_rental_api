import { UsersModel } from '../../../models/users'
import { connection } from '../../connection'
import { SignupUserDB } from '../../protocols/signup/signup-db'

export class DbUsers implements SignupUserDB{
    private tableName = 'tbUsers'
    async add(user: UsersModel):Promise<Boolean>{
        connection.query(`INSERT INTO ${this.tableName} (id, name, email, login, password)
        VALUES (
            '${user.id}', 
            '${user.name}', 
            '${user.email}', 
            '${user.login}', 
            '${user.password}');`)
        return true
    }
}