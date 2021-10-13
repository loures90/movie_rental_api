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
exports.dbMovies = exports.DBMovies = void 0;
const connection_1 = require("../../connection");
class DBMovies {
    constructor() {
        this.tableName = 'tbMovies';
    }
    create(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.connection.query(`INSERT INTO ${this.tableName} (id, title, year_release, category)
        VALUES (
            '${movie.id}', 
            '${movie.title}', 
            '${movie.year_release}', 
            '${movie.category}');`);
            return true;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.connection.query(`SELECT * FROM  ${this.tableName};`);
            return result[0];
        });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.connection.query(`SELECT * FROM  ${this.tableName} WHERE id = '${id}';`);
            return result[0];
        });
    }
    filter(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connection_1.connection.query(`
            SELECT * FROM  ${this.tableName} WHERE ${filters.title && 'title = ' + filters.title +
                filters.year_release && 'and year_release = ' + filters.year_release +
                filters.category && 'and category = ' + filters.category} 
            ;`);
            return result[0];
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
exports.DBMovies = DBMovies;
exports.dbMovies = new DBMovies();
//# sourceMappingURL=movies.js.map