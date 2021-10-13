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
exports.userController = exports.UserController = void 0;
const user_1 = require("../../business/users/user");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, login, password } = req.body;
                const token = yield user_1.userBusiness.signup({ name, email, login, password });
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield user_1.userBusiness.login({ email, password });
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(error.status || 400).send({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.js.map