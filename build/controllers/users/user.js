"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const IdGenerator_1 = require("../../services/IdGenerator");
const signup_user_1 = require("../../data/useCases/users/signup-user");
const user_1 = require("../../infra/database/signup-user/user");
const HashManager_1 = require("../../services/HashManager");
class UserController {
    constructor(signupUserDTO) {
        this.signupUserDTO = signupUserDTO;
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body)
                throw new Error('body not valid');
            const { name, email, login, password } = req.body;
            return this.signupUserDTO.add({ name, email, login, password });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UserController = UserController;
const signupUserDB = new user_1.DbUsers;
const signupUserDTO = new signup_user_1.DbSignupUsers(IdGenerator_1.idGenerator, signupUserDB, HashManager_1.hashManager);
exports.userController = new UserController(signupUserDTO);
//# sourceMappingURL=user.js.map