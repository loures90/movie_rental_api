"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixAddMovies = exports.fixMovies = void 0;
const movies_1 = require("../models/movies");
exports.fixMovies = {
    id: 'any_id',
    title: 'any_title',
    year_release: '2021',
    category: movies_1.Categories.Action
};
exports.fixAddMovies = {
    title: 'any_title',
    year_release: '2021',
    category: 'Action'
};
//# sourceMappingURL=movies.js.map