import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const albumSchema = new Schema({
   id_spotify: {
      type: String,
      required: true,
   },
   album_type: {
      type: String,
      required: true,
   },
   cover: {
      type: {
         url : String,
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

export const Album = mongoose.model('Album', albumSchema);