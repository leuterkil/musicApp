import type { SingleArtistResponse } from "~/types/spotify";

const apiUrl = "https://api.spotify.com"

const getArtist = async (artistId:string,token:string):Promise<SingleArtistResponse>=>{
    const res = await fetch(`${apiUrl}/v1/artists/${artistId}`,{
        headers:{Accept:'application/json',Authorization:`Bearer ${token}`}
    })
    return await res.json();
}

export default getArtist;