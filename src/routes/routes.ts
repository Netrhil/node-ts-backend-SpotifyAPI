import { Router } from "express";
import { SearchController } from '../controllers/searchAlbums';


const router = Router();

const searchApi = new SearchController();
router.get("/SearchAlbum", searchApi.searchAlbum );

export default router;