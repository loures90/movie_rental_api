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
exports.moviesController = exports.MoviesController = void 0;
const movies_1 = require("../../business/movies/movies");
const error_1 = require("../../models/error");
class MoviesController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization)
                    throw new error_1.BaseError('Forbidden');
                yield movies_1.moviesBusiness.create(req.body, req.headers.authorization);
                res.status(200).send(true);
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization)
                    throw new error_1.BaseError('Forbidden');
                const result = yield movies_1.moviesBusiness.list(req.headers.authorization);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
    getMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization)
                    throw new error_1.BaseError('Forbidden');
                const result = yield movies_1.moviesBusiness.getMovie(req.params.id, req.headers.authorization);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
    filter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.headers.authorization)
                    throw new error_1.BaseError('Forbidden');
                const result = yield movies_1.moviesBusiness.filter(req.query, req.headers.authorization);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send(true);
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).send(true);
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
}
exports.MoviesController = MoviesController;
exports.moviesController = new MoviesController();
//# sourceMappingURL=movies.js.map