import { Request, Response, Router } from "express";
import { AuthToken, IAuthClass } from '../services/spotify-api/auth-flow';
import { SearchInSpotify , ISearchInSpotify} from '../services/spotify-api/get-albums';

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const authToken : IAuthClass = new AuthToken();
    const token = await authToken.getToken();

    const spotifyApi : ISearchInSpotify = new SearchInSpotify(token);
    const albums  = await spotifyApi.getAlbums({ q: "polaris", offset: 0 });
    
    console.log(albums)

    res.status(200).send({
        message: "GET request successful!!!"
      });
});

export default router;