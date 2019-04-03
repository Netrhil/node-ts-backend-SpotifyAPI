"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchAlbums_1 = require("../controllers/searchAlbums");
const router = express_1.Router();
const searchApi = new searchAlbums_1.SearchController();
router.get("/SearchAlbum", searchApi.searchAlbum);
exports.default = router;
