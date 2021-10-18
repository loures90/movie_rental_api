export interface UsersModel {
    id:string
    name: string
    login: string
    email: string
    password: string
}
export type AddUserModel = Omit<UsersModel, 'id'>

export interface LoginModel {
    email: string
    password: string
}