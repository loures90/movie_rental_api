"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRouter = void 0;
const express_1 = __importDefault(require("express"));
const movies_1 = require("../../controllers/movies/movies");
exports.moviesRouter = express_1.default.Router();
exports.moviesRouter.post("/add", movies_1.moviesController.create);
exports.moviesRouter.get("/", movies_1.moviesController.list);
exports.moviesRouter.get("/:id", movies_1.moviesController.getMovie);
exports.moviesRouter.get("/filters/search?", movies_1.moviesController.filter);
exports.moviesRouter.delete("/:id", movies_1.moviesController.delete);
exports.moviesRouter.patch("/:id", movies_1.moviesController.update);
//# sourceMappingURL=movies.js.map