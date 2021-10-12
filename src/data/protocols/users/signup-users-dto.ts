import { AddUserModel } from "../../../models/users";

export interface SignupUserDTO {
    add(userInput: AddUserModel):Promise<Boolean>
}