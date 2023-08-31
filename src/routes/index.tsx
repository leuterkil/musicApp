import { Signal, component$, useSignal,$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import searchSong from "~/hooks/apis/searchSong";
import { routeAction$ } from "@builder.io/qwik-city";
import authenticate from "~/hooks/apis/authenticate";
import MusicCard from "~/components/searchSongComponents/musicCard";

export const useSearchSong = routeAction$(async (props,req)=>{
  const auth = await authenticate(req)
  return await searchSong(`${props.searchTerm}`,auth.access_token);
})



export default component$(() => {

  const searchSongAction = useSearchSong()
  const searchTimeout:Signal<any> = useSignal(null);
  const songs:Signal<any> = useSignal([]);

  const handleSearchSongs = $(async (event:any)=>{
    if(searchTimeout)
    {
      window.clearTimeout(searchTimeout.value);
    }
    console.log(event.target.value.length)

    searchTimeout.value = setTimeout(async ()=>{
      if(event.target.value.length===0){
        songs.value = []; 
      }
      else {
        const {value} = await searchSongAction.submit({searchTerm:event.target.value})
        console.log(value)
        songs.value = []; 
        songs.value = value;
        console.log(songs.value)
      }

    },1000)
    
    })



  return (
  <div>
        <input onKeyDown$={handleSearchSongs} 
          type="text" 
          class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none text-black mb-2" />
        <div class="flex justify-around gap-y-8 flex-wrap">
          {songs.value.tracks && songs.value.tracks.items.map((song:any)=>{
            return(
              
                <MusicCard key={song.id} albumImage={song.album.images[0].url} 
                songArtists={song.artists.map((artist:any)=>artist.name)}
                songTitle={song.name} mp3Src={song.preview_url}></MusicCard>
            )
          })}
          </div>
  </div>)
});

export const head: DocumentHead = {
  title: "Insta Song",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
