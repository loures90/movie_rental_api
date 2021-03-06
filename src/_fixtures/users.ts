import { AddUserModel, LoginModel, UsersModel } from '../models/users'

export const fixUser: UsersModel = {
    id: 'any_id',
    name: 'any_name', 
    login: 'any_login', 
    email: 'any_email@email.com', 
    password: 'any_password', 
}

export const fixAddUser: AddUserModel = {
    name: 'any_name', 
    login: 'any_login', 
    email: 'any_email@email.com', 
    password: 'any_password', 
}

export const fixLogin: LoginModel = {
    email: 'any_login@email.com', 
    password: 'any_password', 
}