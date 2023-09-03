import { component$ } from "@builder.io/qwik";
import { ArtistObjectSimplified } from "~/types/spotify";
import { Link } from '@builder.io/qwik-city';


const MusicCard =  component$((props:musicCardProps)=>{
    return (<div class="basis-5/12">
        <img width={640} height={640} class="w-100 rounded-lg" src={props.albumImage}/>
        <h4 class="mt-1 mb-1 font-bold">{props.songTitle}</h4>
        <h5 class="text-slate-500">{props.songArtists.map((artist,index)=>(
           <Link key={artist.id} href={`/artist/${artist.id}`}> {(index+1) ===props.songArtists.length ? artist.name : artist.name+','}</Link>
        ))}</h5>
        <audio src={props.mp3Src} controls/>
    </div>)
})

interface musicCardProps {
    albumImage:string
    songTitle:string
    songArtists:ArtistObjectSimplified[]
    mp3Src:string
}

export default MusicCard