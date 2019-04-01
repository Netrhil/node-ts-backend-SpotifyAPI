import SpotifyWebApi from 'spotify-web-api-node';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from '../secrets';

export interface IAuthClass {
    getToken() : Promise<any> 
}
export class AuthApi implements IAuthClass {
   
    public expired : boolean;
    private spotifyApi : any;

    constructor() {
        this.spotifyApi = new SpotifyWebApi({
            clientId: SPOTIFY_CLIENT_ID,
            clientSecret: SPOTIFY_CLIENT_SECRET
          });
    }

    public async getToken() {

        try {
            const token =  await this.spotifyApi.clientCredentialsGrant();
            return token.body['access_token'];
            
        } catch (error) {
            console.log('Something went wrong when retrieving an access token', error);
                return error;
        }

    }

}