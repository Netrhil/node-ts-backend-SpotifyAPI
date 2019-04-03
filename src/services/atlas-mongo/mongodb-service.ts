import mongoose from "mongoose";

import { Album } from '../../models/albumModel';
import { MONGODB_ATLAS_USER, MONGODB_ATLAS_PASS, MONGO_DB} from '../secrets';
import { IAlbum } from '../common-types';


export class MongoService {
    private uri : string = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASS}@falabella-test-9keat.mongodb.net/${MONGO_DB}?retryWrites=true`;
    
    public async saveAlbums( albums : IAlbum[]) : Promise<any> {

        mongoose.connect(this.uri, { useNewUrlParser: true }).then(() => {
            console.log('Database connection successful');

            Album.collection.insertMany(albums, (err, docs) => {
                if (err){ 
                    return console.error(err);
                } else {
                  console.log("Multiple documents inserted to Collection");
                }
              });

          })
          .catch(err => {
            console.error('Database connection error');
          })
      
    }
}