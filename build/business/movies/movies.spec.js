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
const movies_1 = require("../../infra/database/movies/movies");
const movies_2 = require("../../models/movies");
const movies_3 = require("./movies");
const movies_4 = require("../../_fixtures/movies");
const error_1 = require("../../models/error");
class IdGeneratorStub {
    generate() {
        return 'abc123';
    }
}
const idGeneratorStub = new IdGeneratorStub();
class DbMovieStub extends movies_1.DBMovies {
    create(movie) {
        return Promise.resolve(true);
    }
    list() {
        return Promise.resolve([movies_4.fixMovies]);
    }
    getMovie() {
        return Promise.resolve(movies_4.fixMovies);
    }
}
const dbMovieStub = new DbMovieStub();
class AuthenticatorStub {
    generateToken(input, expiresIn) {
        return 'token';
    }
    getData(token) {
        return { id: 'abc123' };
    }
}
const authenticatorStub = new AuthenticatorStub();
const movieBusinessStub = new movies_3.MoviesBusiness(idGeneratorStub, authenticatorStub, dbMovieStub);
describe('MOVIES', () => {
    describe('Add movie', () => {
        test('It should add a movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.create(movies_4.fixAddMovies, 'token');
            expect(result).toBe(true);
        }));
        test('It should call AuthenticatorStub with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const authSpy = jest.spyOn(authenticatorStub, 'getData');
            yield movieBusinessStub.create(movies_4.fixAddMovies, 'token');
            expect(authSpy).toHaveBeenCalledWith('token');
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.create({
                title: '',
                year_release: '2021',
                category: 'Action'
            }, 'token');
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.create({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category'
            }, 'token');
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'create');
            yield movieBusinessStub.create(movies_4.fixAddMovies, 'token');
            expect(movieSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, movies_4.fixAddMovies), { id: 'abc123', category: movies_2.Categories.Action }));
        }));
    });
    describe('List movie', () => {
        test('It should list movies', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.list('token');
            expect(result[0]).toEqual(expect.objectContaining({ category: 'ACTION', id: 'any_id', title: 'any_title', year_release: '2021' }));
        }));
        test('It should call AuthenticatorStub with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const authSpy = jest.spyOn(authenticatorStub, 'getData');
            yield movieBusinessStub.list('token');
            expect(authSpy).toHaveBeenCalledWith('token');
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'list');
            yield movieBusinessStub.list('token');
            expect(movieSpy).toHaveBeenCalledWith();
        }));
    });
    describe('Get a movie by id', () => {
        test('It should get a movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.getMovie('abc123', 'token');
            expect(result).toBe(movies_4.fixMovies);
        }));
        test('It should call Authenticator with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const authSpy = jest.spyOn(authenticatorStub, 'getData');
            yield movieBusinessStub.getMovie('abc123', 'token');
            expect(authSpy).toHaveBeenCalledWith('token');
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'getMovie');
            yield movieBusinessStub.getMovie('abc123', 'token');
            expect(movieSpy).toHaveBeenCalledWith('abc123');
        }));
    });
});
//# sourceMappingURL=movies.spec.js.map