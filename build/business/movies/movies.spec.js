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
    delete(id) {
        return Promise.resolve(true);
    }
    update(movie, id) {
        return Promise.resolve(true);
    }
    filter(filters) {
        return Promise.resolve([movies_4.fixMovies]);
    }
}
const dbMovieStub = new DbMovieStub();
const movieBusinessStub = new movies_3.MoviesBusiness(idGeneratorStub, dbMovieStub);
describe('MOVIES', () => {
    describe('Add movie', () => {
        test('It should add a movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.create(movies_4.fixAddMovies);
            expect(result).toBe(true);
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.create({
                title: '',
                year_release: '2021',
                category: 'Action'
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.create({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category'
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'create');
            yield movieBusinessStub.create(movies_4.fixAddMovies);
            expect(movieSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, movies_4.fixAddMovies), { id: 'abc123', category: movies_2.Categories.Action }));
        }));
    });
    describe('List movie', () => {
        test('It should list movies', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.list();
            expect(result[0]).toEqual(expect.objectContaining({ category: 'ACTION', id: 'any_id', title: 'any_title', year_release: '2021' }));
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'list');
            yield movieBusinessStub.list();
            expect(movieSpy).toHaveBeenCalledWith();
        }));
    });
    describe('Get a movie by id', () => {
        test('It should get a movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.getMovie('abc123');
            expect(result).toBe(movies_4.fixMovies);
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'getMovie');
            yield movieBusinessStub.getMovie('abc123');
            expect(movieSpy).toHaveBeenCalledWith('abc123');
        }));
    });
    describe('Delete a movie by id', () => {
        test('It should delete a movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.delete('abc123');
            expect(result).toBe(true);
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'delete');
            yield movieBusinessStub.delete('abc123');
            expect(movieSpy).toHaveBeenCalledWith('abc123');
        }));
    });
    describe('Update movie', () => {
        test('It should add a movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.update(movies_4.fixAddMovies, 'abc123');
            expect(result).toBe(true);
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.update({
                title: '',
                year_release: '2021',
                category: 'Action'
            }, 'abc123');
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.update({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category'
            }, 'abc123');
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'update');
            yield movieBusinessStub.update(movies_4.fixAddMovies, 'abc123');
            expect(movieSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, movies_4.fixAddMovies), { category: movies_2.Categories.Action }), 'abc123');
        }));
    });
    describe('Delete a movie by id', () => {
        const filterStub = {
            title: 'any_title',
            category: 'Comedy',
            year_release: '2001',
            notation: 'gt'
        };
        test('It should delete a movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield movieBusinessStub.filter(filterStub);
            expect(result[0]).toEqual(expect.objectContaining({ category: 'ACTION', id: 'any_id', title: 'any_title', year_release: '2021' }));
        }));
        test('It should check if filters are valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.filter(Object.assign(Object.assign({}, filterStub), { otherFilter: 'any' }));
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if notation is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.filter(Object.assign(Object.assign({}, filterStub), { notation: '>>>' }));
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should check if some input is empty valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = movieBusinessStub.filter({
                title: 'any_title',
                year_release: '2021',
                category: 'not_a_category',
                notation: 'gt'
            });
            yield expect(result).rejects.toThrowError(error_1.BaseError);
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieSpy = jest.spyOn(dbMovieStub, 'filter');
            yield movieBusinessStub.filter(filterStub);
            expect(movieSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, filterStub), { category: 'COMEDY', notation: '>' }));
        }));
        test('It should call dbMovies with correct values', () => __awaiter(void 0, void 0, void 0, function* () {
            const secondFilterStub = {
                title: 'any_title',
                category: 'Comedy',
                year_release: '2001'
            };
            const movieSpy = jest.spyOn(dbMovieStub, 'filter');
            yield movieBusinessStub.filter(secondFilterStub);
            expect(movieSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, secondFilterStub), { category: 'COMEDY' }));
        }));
    });
});
//# sourceMappingURL=movies.spec.js.map