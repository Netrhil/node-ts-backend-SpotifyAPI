import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { AuthService, IAuthClass } from '../services/spotify-api/auth-flow';
import { SearchInSpotify } from '../services/spotify-api/get-albums';
import { albumSchema } from '../models/albumModel';

interface ISearchClass {
    searchAlbum(req: Request , res: Response) : Promise<Response>
}

export class SearchController implements ISearchClass {
    
    public async searchAlbum (req: Request, res: Response) {
        try {
            const auth : IAuthClass = new AuthService();
            const token = await auth.getToken();
            const spotifyApi = new SearchInSpotify(token);

            const regexUrl = /^\/SearchAlbum\?query=[A-Za-z0-9]+&offset=[0-9]+$/;
            const url = req.url;

            if( !regexUrl.test(url) ) {
                return res.status(400).send({
                    success: 'false',
                    message: 'Missing parameters'
                });

            } else  {
                const albums  = await spotifyApi.getAlbums({ q: req.query.query, offset: req.query.offset });
                return res.status(201).send({
                    success: 'true',
                    message: 'Yayy~!',
                    albums
                })
            }
            
        } catch (error) {
            console.log("error", error);
            return res.status(400).send({
                success: 'false',
                message: error
            });
        }
        
    }
}
/* async (req: Request, res: Response) => {
 

    const spotifyApi : ISearchInSpotify = new SearchInSpotify(token);
    const albums  = await spotifyApi.getAlbums({ q: "polaris", offset: 0 });
    
    console.log(albums) */