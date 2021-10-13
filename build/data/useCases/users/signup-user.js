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
exports.DbSignupUsers = void 0;
const error_1 = require("../../../models/error");
class DbSignupUsers {
    constructor(idGenerator, signupUserDB, hashManager) {
        this.idGenerator = idGenerator;
        this.signupUserDB = signupUserDB;
        this.hashManager = hashManager;
    }
    add(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.values(userInput).forEach(value => {
                if (!value)
                    throw new error_1.BaseError('Values can not be empty', 400);
            });
            const validEmail = ['@', '.com'];
            validEmail.forEach(element => {
                if (!userInput.email.includes(element))
                    throw new error_1.BaseError('email not valid');
            });
            if (userInput.password.length < 6)
                throw new error_1.BaseError('password not valid, it should have at least 6 characters');
            const hashPassword = yield this.hashManager.hash(userInput.password);
            const id = this.idGenerator.generate();
            const user = {
                id: id,
                name: userInput.name,
                email: userInput.email,
                login: userInput.login,
                password: hashPassword
            };
            this.signupUserDB.add(user);
            return true;
        });
    }
}
exports.DbSignupUsers = DbSignupUsers;
//# sourceMappingURL=signup-user.js.map