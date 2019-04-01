"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_flow_1 = require("../services/spotify-api/auth-flow");
const router = express_1.Router();
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const auth = new auth_flow_1.AuthApi();
    const token = yield auth.getToken();
    res.status(200).send({
        message: "GET request successful!!!" + token
    });
}));
exports.default = router;
