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
const users_1 = require("../../../_fixtures/users");
const signup_user_1 = require("./signup-user");
const error_1 = require("../../../models/error");
class IdGeneratorStub {
    generate() {
        return 'abc123';
    }
}
const idGeneratorStub = new IdGeneratorStub();
class SignupUserDBStub {
    add(user) {
        return Promise.resolve(true);
    }
}
const signupUserDBStub = new SignupUserDBStub();
class HashManagerStub {
    hash(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve('password');
        });
    }
    compare(text, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(true);
        });
    }
}
const hashManagerStub = new HashManagerStub();
const dbSignupUsersStup = new signup_user_1.DbSignupUsers(idGeneratorStub, signupUserDBStub, hashManagerStub);
describe('USER', () => {
    test('It should create an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield dbSignupUsersStup.add(users_1.fixAddUser);
        expect(result).toBe(true);
    }));
    test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = dbSignupUsersStup.add({
            name: '',
            login: 'any_login',
            email: 'any_email@email.com',
            password: 'any_password',
        });
        yield expect(result).rejects.toThrowError(error_1.BaseError);
    }));
    test('It should check if email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = dbSignupUsersStup.add({
            name: 'any_name',
            login: 'any_login',
            email: 'any_emailemail.com',
            password: 'any_password',
        });
        yield expect(result).rejects.toThrowError(error_1.BaseError);
    }));
    test('It should check if password is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = dbSignupUsersStup.add({
            name: 'any_name',
            login: 'any_login',
            email: 'any_emailemail.com',
            password: 'any_',
        });
        yield expect(result).rejects.toThrowError(error_1.BaseError);
    }));
    test('It should call hashPassword with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
        const hashSpy = jest.spyOn(hashManagerStub, 'hash');
        yield dbSignupUsersStup.add(users_1.fixAddUser);
        expect(hashSpy).toHaveBeenCalledWith(users_1.fixAddUser.password);
    }));
    test('It should call signupUserDB with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
        const signupDBSpy = jest.spyOn(signupUserDBStub, 'add');
        yield dbSignupUsersStup.add(users_1.fixAddUser);
        expect(signupDBSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, users_1.fixAddUser), { password: 'password', id: 'abc123' }));
    }));
});
//# sourceMappingURL=signup-user.spec.js.map