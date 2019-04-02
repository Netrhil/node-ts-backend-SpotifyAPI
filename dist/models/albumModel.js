"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
const albumSchema = new Schema({
    album_type: {
        type: String,
        required: true,
    },
    cover: {
        type: {
            url: String,
            height: Number,
            width: Number
        },
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.Album = mongoose.model('Album', albumSchema);
