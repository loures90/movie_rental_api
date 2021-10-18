import { UsersModel } from '../../../models/users'
import { connection } from '../../connection'
import { GetUserDB } from '../../protocols/users/get-user-db'
import { SignupUserDB } from '../../protocols/users/signup-db'

export class DbUsers implements SignupUserDB, GetUserDB{
    private tableName = 'tbUsers'
    async add(user: UsersModel):Promise<boolean>{
        await connection.query(`INSERT INTO ${this.tableName} (id, name, email, login, password)
        VALUES (
            '${user.id}', 
            '${user.name}', 
            '${user.email}', 
            '${user.login}', 
            '${user.password}');`)
        return true
    }
    async get(email: string): Promise<any>{
        const result = await connection.query(`SELECT id, password FROM ${this.tableName} where ${this.tableName}.email = '${email}';`)
        return result[0][0]
    }
}
export const dbUsers = new DbUsers()