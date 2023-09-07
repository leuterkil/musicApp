import {Signal, component$} from '@builder.io/qwik'
import { DocumentHead, Loader, routeLoader$} from '@builder.io/qwik-city'
import MusicCard from '~/components/searchSongComponents/musicCard';
import authenticate from '~/hooks/apis/authenticate';
import getAlbum from '~/hooks/apis/getAlbum';
import type { SingleAlbumResponse } from '~/types/spotify';

export const useGetAlbum:Loader<SingleAlbumResponse> = routeLoader$(async (props)=>{
    const auth = await authenticate(props)
    return await getAlbum(`${props.params.id}`,auth.access_token);
  })

export default component$(() => {
    const album:Readonly<Signal<SingleAlbumResponse>> = useGetAlbum();

    return (
    <>
      <img class="rounded-full mx-auto" 
        width={album.value.images[1].width && album.value.images[1].width} 
        height={album.value.images[1].width && album.value.images[1].width} 
        src={album.value.images[1].url}/>

      <h3 class="text-center mt-3 mb-5">{album.value?.name}</h3>

      <h4 class="text-2xl">Album's Tracks</h4>
      <div class="flex flex-wrap justify-center gap-10 my-3">
        {album.value.tracks && album.value.tracks.items.map(track=>(
          <div key={track.id} class="basis-2/12">
            <MusicCard 
            albumImage={album.value.images[0].url} 
            songArtists={track.artists} 
            songTitle={track.name} 
            mp3Src={track.preview_url || ''}/>
          </div>
        ))}
      </div>

    </>
    )
})

export const head: DocumentHead = ({resolveValue})=>{

    const album = resolveValue(useGetAlbum);

    return{
        title:album.name,
        meta: [
          {
            name: "description",
            content: "Qwik site description",
          },
        ],
    }
  };