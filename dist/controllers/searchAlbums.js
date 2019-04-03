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
const auth_flow_1 = require("../services/spotify-api/auth-flow");
const get_albums_1 = require("../services/spotify-api/get-albums");
const mongodb_service_1 = require("../services/atlas-mongo/mongodb-service");
class SearchController {
    searchAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = new auth_flow_1.AuthService();
                const token = yield auth.getToken();
                const spotifyApi = new get_albums_1.SearchInSpotify(token);
                const regexUrl = /^\/SearchAlbum\?query=.+&offset=[0-9]+$/;
                const url = req.url;
                if (!regexUrl.test(url)) {
                    return res.status(400).send({
                        success: 'false',
                        message: 'Missing parameters'
                    });
                }
                else {
                    const results = yield spotifyApi.getAlbums({ q: req.query.query, offset: req.query.offset });
                    const mongoS = new mongodb_service_1.MongoService();
                    if (results.albums.length > 0) {
                        mongoS.saveAlbums(results.albums);
                    }
                    return res.status(201).send(Object.assign({ success: 'true', message: 'success' }, results));
                }
            }
            catch (error) {
                console.log("error", error);
                return res.status(400).send({
                    success: 'false',
                    message: error
                });
            }
        });
    }
}
exports.SearchController = SearchController;
/* async (req: Request, res: Response) => {
 

    const spotifyApi : ISearchInSpotify = new SearchInSpotify(token);
    const albums  = await spotifyApi.getAlbums({ q: "polaris", offset: 0 });
    
    console.log(albums) */
