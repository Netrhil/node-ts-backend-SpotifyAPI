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
const mongoose_1 = __importDefault(require("mongoose"));
const albumModel_1 = require("../../models/albumModel");
const secrets_1 = require("../secrets");
class MongoService {
    constructor() {
        this.uri = `mongodb+srv://${secrets_1.MONGODB_ATLAS_USER}:${secrets_1.MONGODB_ATLAS_PASS}@falabella-test-9keat.mongodb.net/${secrets_1.MONGO_DB}?retryWrites=true`;
    }
    saveAlbums(albums) {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.connect(this.uri, { useNewUrlParser: true }).then(() => {
                console.log('Database connection successful');
                albumModel_1.Album.collection.insertMany(albums, (err, docs) => {
                    if (err) {
                        return console.error(err);
                    }
                    else {
                        console.log("Multiple documents inserted to Collection");
                    }
                });
            })
                .catch(err => {
                console.error('Database connection error');
            });
        });
    }
}
exports.MongoService = MongoService;
