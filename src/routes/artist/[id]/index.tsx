import {Signal, component$, useSignal} from '@builder.io/qwik'
import { Loader, routeLoader$, useLocation} from '@builder.io/qwik-city'
import MusicCard from '~/components/searchSongComponents/musicCard';
import authenticate from '~/hooks/apis/authenticate';
import getArtist from '~/hooks/apis/getArtist';
import getArtistTopTracks from '~/hooks/apis/getArtistTopTracks';
import useNumberShort from '~/hooks/numberShortenerHook';
import { ArtistsTopTracksResponse, SingleArtistResponse } from '~/types/spotify';

export const useGetArtist:Loader<SingleArtistResponse> = routeLoader$(async (props)=>{
    const auth = await authenticate(props)
    return await getArtist(`${props.params.id}`,auth.access_token);
  })
export const useGetArtistTopTracks:Loader<ArtistsTopTracksResponse> = routeLoader$(async (props)=>{
    const auth = await authenticate(props)
    return await getArtistTopTracks(`${props.params.id}`,auth.access_token);
  })

export default component$(() => {
    const artist:Readonly<Signal<SingleArtistResponse>> = useGetArtist();
    const topTracks:Readonly<Signal<ArtistsTopTracksResponse>> = useGetArtistTopTracks();
    const followers:string = useNumberShort(artist.value.followers.total); 

    return <>
    <img class="rounded-full mx-auto" width={artist.value.images[1].width && artist.value.images[1].width} height={artist.value.images[1].width && artist.value.images[1].width} src={artist.value.images[1].url}/>
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
    </>
})