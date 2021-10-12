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
const users_1 = require("../../_fixtures/users");
const error_1 = require("../../models/error");
const user_1 = require("../../infra/database/user/user");
const user_2 = require("./user");
class IdGeneratorStub {
    generate() {
        return 'abc123';
    }
}
const idGeneratorStub = new IdGeneratorStub();
class DbUsersStub extends user_1.DbUsers {
    add(user) {
        return Promise.resolve(true);
    }
    get(id) {
        return Promise.resolve({ id: 'abc123', password: 'password' });
    }
}
const dbUsersStub = new DbUsersStub();
class HashManagerStub {
    hash(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve('hash_password');
        });
    }
    compare(text, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(true);
        });
    }
}
const hashManagerStub = new HashManagerStub();
class AuthenticatorStub {
    generateToken(input, expiresIn) {
        return 'token';
    }
    getData(token) {
        return { id: 'abc123' };
    }
}
const authenticatorStub = new AuthenticatorStub();
const userBusinessStub = new user_2.UserBusiness(idGeneratorStub, hashManagerStub, dbUsersStub, authenticatorStub);
describe('USER', () => {
    describe('signup', () => {
        test('It should create an user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield userBusinessStub.signup(users_1.fixAddUser);
            expect(result).toBe('token');
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = userBusinessStub.signup({
                name: '',
                login: 'any_login',
                email: 'any_email@email.com',
                password: 'any_password',
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = userBusinessStub.signup({
                name: 'any_name',
                login: 'any_login',
                email: 'any_emailemail.com',
                password: 'password',
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if password is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = userBusinessStub.signup({
                name: 'any_name',
                login: 'any_login',
                email: 'any_emailemail.com',
                password: 'any_',
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should call hashPassword with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const hashSpy = jest.spyOn(hashManagerStub, 'hash');
            yield userBusinessStub.signup(users_1.fixAddUser);
            expect(hashSpy).toHaveBeenCalledWith(users_1.fixAddUser.password);
        }));
        test('It should call dbUsers with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const signupSpy = jest.spyOn(dbUsersStub, 'add');
            yield userBusinessStub.signup(users_1.fixAddUser);
            expect(signupSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, users_1.fixAddUser), { password: 'hash_password', id: 'abc123' }));
        }));
    });
    describe('Login', () => {
        test('It should make Login', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield userBusinessStub.login(users_1.fixLogin);
            expect(result).toBe('token');
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = userBusinessStub.login({
                email: '',
                password: 'any_password',
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = userBusinessStub.login({
                email: 'any_emailemail.com',
                password: 'password',
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if password is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = userBusinessStub.login({
                email: 'any_email@email.com',
                password: 'any_',
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should call hashPassword with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const hashSpy = jest.spyOn(hashManagerStub, 'compare');
            yield userBusinessStub.login(users_1.fixLogin);
            expect(hashSpy).toHaveBeenCalledWith(users_1.fixLogin.password, 'password');
        }));
    });
});
//# sourceMappingURL=user.spec.js.map