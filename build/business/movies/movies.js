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
const IdGenerator_1 = require("../../services/IdGenerator");
class MoviesBusiness {
    constructor(idGenerator, dbMovies) {
        this.idGenerator = idGenerator;
        this.dbMovies = dbMovies;
    }
    create(inputMovie) {
        return __awaiter(this, void 0, void 0, function* () {
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
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbMovies.list();
        });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbMovies.getMovie(id);
        });
    }
    filter(filtersInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = Object.assign({}, filtersInput);
            const validParams = ['title', 'year_release', 'category', 'notation'];
            Object.keys(filters).forEach(key => {
                if (!validParams.includes(key))
                    throw new error_1.BaseError(key + ' filter not allowed');
            });
            if (filters.notation) {
                if (filters.notation === 'gt')
                    filters.notation = '>';
                else if (filters.notation === 'lt')
                    filters.notation = '<';
                else
                    throw new error_1.BaseError('Year release filter notation should be "gt" or "lt"');
            }
            if (filters.category) {
                const isAValidCategory = movies_2.movieCategories.includes(filters.category.toUpperCase());
                if (!isAValidCategory)
                    throw new error_1.BaseError(filters.category + ' is not a valid category.');
                let category;
                switch (filters.category.toUpperCase()) {
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
                filters.category = category;
            }
            return yield this.dbMovies.filter(filters);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbMovies.delete(id);
        });
    }
    update(updateMovie, id) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.values(updateMovie).forEach(value => {
                if (!value)
                    throw new error_1.BaseError('Values can not be empty');
            });
            let movie = Object.assign({}, updateMovie);
            if (updateMovie.category) {
                let category;
                const isAValidCategory = movies_2.movieCategories.includes(updateMovie.category.toUpperCase());
                if (!isAValidCategory)
                    throw new error_1.BaseError(updateMovie.category + ' is not a valid category.');
                switch (updateMovie.category.toUpperCase()) {
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
                movie = Object.assign(Object.assign({}, movie), { category: category });
            }
            return yield this.dbMovies.update(movie, id);
        });
    }
}
exports.MoviesBusiness = MoviesBusiness;
exports.moviesBusiness = new MoviesBusiness(IdGenerator_1.idGenerator, movies_1.dbMovies);
//# sourceMappingURL=movies.js.map