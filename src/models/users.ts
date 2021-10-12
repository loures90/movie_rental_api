export interface UsersModel {
    id:string
    name: string
    login: string
    email: string
    password: string
}
export interface AddUserModel extends Omit<UsersModel, 'id'> {
}