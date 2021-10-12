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
exports.userBusiness = exports.UserBusiness = void 0;
const IdGenerator_1 = require("../../services/IdGenerator");
const HashManager_1 = require("../../services/HashManager");
const error_1 = require("../../models/error");
const user_1 = require("../../infra/database/user/user");
const Authenticator_1 = require("../../services/Authenticator");
class UserBusiness {
    constructor(idGenerator, hashManager, dbUsers, authenticator) {
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.dbUsers = dbUsers;
        this.authenticator = authenticator;
    }
    signup(userInput) {
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
            const result = yield this.dbUsers.add(user);
            const token = result && this.authenticator.generateToken({ id });
            return token;
        });
    }
    login(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.values(loginInput).forEach(value => {
                if (!value)
                    throw new error_1.BaseError('Values can not be empty', 400);
            });
            if (loginInput.password.length < 6)
                throw new error_1.BaseError('password not valid, it should have at least 6 characters');
            const validEmail = ['@', '.com'];
            validEmail.forEach(element => {
                if (!loginInput.email.includes(element))
                    throw new error_1.BaseError('email not valid');
            });
            const result = yield this.dbUsers.get(loginInput.email);
            const validatePassword = result && (yield this.hashManager.compare(loginInput.password, result.password));
            if (!validatePassword)
                throw new error_1.BaseError('E-mail and password are not valid');
            const token = this.authenticator.generateToken({ id: result.id });
            return token;
        });
    }
}
exports.UserBusiness = UserBusiness;
exports.userBusiness = new UserBusiness(IdGenerator_1.idGenerator, HashManager_1.hashManager, user_1.dbUsers, Authenticator_1.authenticator);
//# sourceMappingURL=user.js.map