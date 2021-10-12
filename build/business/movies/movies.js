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
exports.moviesBusiness = exports.MoviesBusiness = void 0;
const error_1 = require("../../models/error");
const movies_1 = require("../../infra/database/movies/movies");
const movies_2 = require("../../models/movies");
const Authenticator_1 = require("../../services/Authenticator");
const IdGenerator_1 = require("../../services/IdGenerator");
class MoviesBusiness {
    constructor(idGenerator, authenticator, dbMovies) {
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
        this.dbMovies = dbMovies;
    }
    create(inputMovie, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = this.authenticator.getData(token);
            if (!isAuthenticated.id)
                throw new error_1.BaseError('Forbidden');
            if (!inputMovie.title || !inputMovie.year_release || !inputMovie.category)
                throw new error_1.BaseError('Values can not be empty');
            const isAValidCategory = movies_2.movieCategories.includes(inputMovie.category.toUpperCase());
            if (!isAValidCategory)
                throw new error_1.BaseError(inputMovie.category + ' is not a valid category.');
            let category;
            switch (inputMovie.category.toUpperCase()) {
                case 'ACTION':
                    category = movies_2.Categories.Action;
                    break;
                case 'COMEDY':
                    category = movies_2.Categories.Comedy;
                    break;
                case 'DRAMA':
                    category = movies_2.Categories.Drama;
                    break;
                case 'FANTASY':
                    category = movies_2.Categories.Fantasy;
                    break;
                case 'HORROR':
                    category = movies_2.Categories.Horror;
                    break;
                case 'MYSTERY':
                    category = movies_2.Categories.Mystery;
                    break;
                case 'ROMANCE':
                    category = movies_2.Categories.Romance;
                    break;
                case 'THRILLER':
                    category = movies_2.Categories.Thriller;
                    break;
                default:
                    category = movies_2.Categories.Thriller;
                    break;
            }
            const id = this.idGenerator.generate();
            const movie = Object.assign(Object.assign({ id: id }, inputMovie), { category: category });
            yield this.dbMovies.create(movie);
            return true;
        });
    }
    list(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = this.authenticator.getData(token);
            if (!isAuthenticated.id)
                throw new error_1.BaseError('Forbidden');
            return yield this.dbMovies.list();
        });
    }
    getMovie(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = this.authenticator.getData(token);
            if (!isAuthenticated.id)
                throw new error_1.BaseError('Forbidden');
            return yield this.dbMovies.getMovie(id);
        });
    }
    filter(filters, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = this.authenticator.getData(token);
            if (!isAuthenticated.id)
                throw new error_1.BaseError('Forbidden');
            return yield this.dbMovies.filter(filters);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.MoviesBusiness = MoviesBusiness;
exports.moviesBusiness = new MoviesBusiness(IdGenerator_1.idGenerator, Authenticator_1.authenticator, movies_1.dbMovies);
//# sourceMappingURL=movies.js.map