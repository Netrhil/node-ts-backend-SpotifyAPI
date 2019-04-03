"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
class SearchInSpotify {
    constructor(token) {
        this.spotifyApi = new spotify_web_api_node_1.default({});
        this.spotifyApi.setAccessToken(token);
    }
    getAlbums(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.spotifyApi.searchAlbums(params.q, { limit: 20, offset: params.offset });
                const responde = {
                    albums: this.parseAlbumObject(results.body.albums.items),
                    next_offset: results.body.albums.next ? Number(params.offset) + 20 : "false"
                };
                return responde;
            }
            catch (error) {
                return error;
            }
        });
    }
    parseAlbumObject(arrayAlbumOBject) {
        const parsedAlbums = arrayAlbumOBject.map(e => ({
            album_type: e.album_type,
            cover: e.images[1],
            name: e.name,
            release_date: e.release_date,
            artist: e.artists[0].name
        }));
        return parsedAlbums;
    }
}
exports.SearchInSpotify = SearchInSpotify;
