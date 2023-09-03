import {Signal, component$} from '@builder.io/qwik'
import { Loader, routeLoader$} from '@builder.io/qwik-city'
import AlbumCard from '~/components/searchSongComponents/AlbumCard';
import MusicCard from '~/components/searchSongComponents/musicCard';
import authenticate from '~/hooks/apis/authenticate';
import getArtist from '~/hooks/apis/getArtist';
import getArtistAlbums from '~/hooks/apis/getArtistAlbums';
import getArtistTopTracks from '~/hooks/apis/getArtistTopTracks';
import useNumberShort from '~/hooks/numberShortenerHook';
import type { ArtistsAlbumsResponse, ArtistsTopTracksResponse, SingleArtistResponse } from '~/types/spotify';

export const useGetArtist:Loader<SingleArtistResponse> = routeLoader$(async (props)=>{
    const auth = await authenticate(props)
    return await getArtist(`${props.params.id}`,auth.access_token);
  })
export const useGetArtistTopTracks:Loader<ArtistsTopTracksResponse> = routeLoader$(async (props)=>{
    const auth = await authenticate(props)
    return await getArtistTopTracks(`${props.params.id}`,auth.access_token);
  })

export const useGetArtistAlbums:Loader<ArtistsAlbumsResponse> = routeLoader$(async (props)=>{
    const auth = await authenticate(props)
    return await getArtistAlbums(`${props.params.id}`,auth.access_token);
  })

export default component$(() => {
    const artist:Readonly<Signal<SingleArtistResponse>> = useGetArtist();
    const topTracks:Readonly<Signal<ArtistsTopTracksResponse>> = useGetArtistTopTracks();
    const albums:Readonly<Signal<ArtistsAlbumsResponse>> = useGetArtistAlbums();
    const followers:string = useNumberShort(artist.value.followers.total); 

    return (
    <>
      <img class="rounded-full mx-auto" 
        width={artist.value.images[1].width && artist.value.images[1].width} 
        height={artist.value.images[1].width && artist.value.images[1].width} 
        src={artist.value.images[1].url}/>

      <h3 class="text-center mt-3 mb-5">{artist.value?.name}</h3>
      <div class="text-center flex justify-center flex-col gap-y-2"><span class="text-extrabold text-3xl">{followers}</span> Followers</div>

      <h4 class="text-2xl">Artist's Top Tracks</h4>
      <div class="flex flex-wrap justify-center gap-10 my-3">
        {topTracks.value.tracks && topTracks.value.tracks.map(track=>(
          <div key={track.id} class="basis-2/12">
            <MusicCard 
            albumImage={track.album.images[0].url} 
            songArtists={track.artists} 
            songTitle={track.name} 
            mp3Src={track.preview_url || ''}/>
          </div>
        ))}
      </div>

      <h4 class="text-2xl">Discography</h4>
      <div class="flex flex-wrap justify-center gap-10 my-3">
        {albums.value.items && albums.value.items.map(album=>(
          <div key={album.id} class="basis-2/12">
            <AlbumCard 
            albumImage={album.images[0]} 
            albumTitle={album.name} 
            totalTracks={album.total_tracks}
            releaseYear={album.release_date}/>
          </div>
        ))}
      </div>

    </>
    )
})