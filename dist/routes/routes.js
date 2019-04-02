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
const get_albums_1 = require("../services/spotify-api/get-albums");
const router = express_1.Router();
router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const authToken = new auth_flow_1.AuthToken();
    const token = yield authToken.getToken();
    const spotifyApi = new get_albums_1.SearchInSpotify(token);
    const albums = yield spotifyApi.getAlbums({ q: "polaris", offset: 0 });
    console.log(albums);
    res.status(200).send({
        message: "GET request successful!!!"
    });
}));
exports.default = router;
