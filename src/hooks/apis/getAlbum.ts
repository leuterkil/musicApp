import type { SingleAlbumResponse, } from "~/types/spotify";

const apiUrl = "https://api.spotify.com"

const getAlbum = async (albumId:string,token:string):Promise<SingleAlbumResponse>=>{
    const res = await fetch(`${apiUrl}/v1/albums/${albumId}`,{
        headers:{Accept:'application/json',Authorization:`Bearer ${token}`}
    })
    return await res.json();
}

export default getAlbum;