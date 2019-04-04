interface ICover {
    url : URL
    height: number
    width: number
}

export interface IAlbum {
    id_spotify: string
    album_type : string
    cover : ICover
    name : string
    release_date: string
    artist : string
}