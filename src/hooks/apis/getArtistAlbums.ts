import type { ArtistsAlbumsResponse } from "~/types/spotify";

const apiUrl = "https://api.spotify.com"

const getArtistAlbums = async (artistId:string,token:string):Promise<ArtistsAlbumsResponse>=>{
    const res = await fetch(`${apiUrl}/v1/artists/${artistId}/albums?market=GR&limit=5&offset=0&include_groups=single,album`,{
        headers:{Accept:'application/json',Authorization:`Bearer ${token}`}
    })
    return await res.json();
}

export default getArtistAlbums;