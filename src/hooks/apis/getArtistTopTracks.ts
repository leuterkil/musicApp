import { ArtistsTopTracksResponse, SingleArtistResponse } from "~/types/spotify";

const apiUrl = "https://api.spotify.com"

const getArtistTopTracks = async (artistId:string,token:string):Promise<ArtistsTopTracksResponse>=>{
    const res = await fetch(`${apiUrl}/v1/artists/${artistId}/top-tracks?market=GR`,{
        headers:{Accept:'application/json',Authorization:`Bearer ${token}`}
    })
    return await res.json();
}

export default getArtistTopTracks;