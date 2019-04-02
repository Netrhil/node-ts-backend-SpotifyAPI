import SpotifyWebApi from 'spotify-web-api-node';
import { IAlbum } from '../common-types';

interface IParamsQuery {
    q : string
    offset : number
}

export interface ISearchInSpotify {
    getAlbums( params: IParamsQuery) : Promise<IAlbum[]>
}

export class SearchInSpotify {

    private spotifyApi : any;

    constructor( token : string) {
        this.spotifyApi = new SpotifyWebApi({});
        this.spotifyApi.setAccessToken(token);
    }

    public async getAlbums(params: IParamsQuery) {
        try {
            const results = await this.spotifyApi.searchAlbums(params.q, { limit : 20, offset : params.offset });
            return this.parseAlbumObject(results.body.albums.items);

        } catch (error) {
            return error;      
        }
    }


    private parseAlbumObject( arrayAlbumOBject : any[] ) : IAlbum[] {

        const parsedAlbums : IAlbum[] = arrayAlbumOBject.map( e => 
            (
                {
                    album_type : e.album_type,
                    cover : e.images[1],
                    name : e.name,
                    release_date: e.release_date,
                    artist : e.artists[0].name
                }
            )
        );

        return parsedAlbums;
    }
    
}