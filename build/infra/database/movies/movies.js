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
            const query = [];
            filters.title && query.push(`title = '${filters.title}'`);
            filters.category && query.push(`category = '${filters.category}'`);
            filters.notation && filters.year_release && query.push(`year_release ${filters.notation} '${filters.year_release}'`);
            !filters.notation && filters.year_release && query.push(`year_release = '${filters.year_release}'`);
            let where = '';
            query.forEach((part, index) => {
                if (index !== query.length - 1)
                    where += part + ' and ';
                else
                    where += part;
            });
            console.log(where, query);
            const result = yield connection_1.connection.query(`
            SELECT * FROM  ${this.tableName} WHERE ${where};`);
            return result[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.connection.query(`DELETE FROM  ${this.tableName} WHERE id = '${id}';`);
            return true;
        });
    }
    update(movie, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = [];
            movie.title && query.push(`title = '${movie.title}'`);
            movie.category && query.push(`category = '${movie.category}'`);
            movie.year_release && query.push(`year_release = '${movie.year_release}'`);
            let result = '';
            query.forEach(piece => {
                result += piece + ', ';
            });
            result = result.substring(0, result.length - 2);
            yield connection_1.connection.query(`UPDATE ${this.tableName} set ${result} where id = '${id}';`);
            return true;
        });
    }
}
exports.DBMovies = DBMovies;
exports.dbMovies = new DBMovies();
//# sourceMappingURL=movies.js.map