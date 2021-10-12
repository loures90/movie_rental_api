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
exports.dbUsers = exports.DbUsers = void 0;
const connection_1 = require("../../connection");
class DbUsers {
    constructor() {
        this.tableName = 'tbUsers';
    }
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.connection.query(`INSERT INTO ${this.tableName} (id, name, email, login, password)
        VALUES (
            '${user.id}', 
            '${user.name}', 
            '${user.email}', 
            '${user.login}', 
            '${user.password}');`);
            return true;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.connection.query(`SELECT id, password FROM ${this.tableName};`);
        });
    }
}
exports.DbUsers = DbUsers;
exports.dbUsers = new DbUsers();
//# sourceMappingURL=user.js.map