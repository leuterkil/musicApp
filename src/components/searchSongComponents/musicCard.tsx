import { component$ } from "@builder.io/qwik";


const MusicCard =  component$((props:musicCardProps)=>{
    return (<div class="basis-5/12">
        <img width={640} height={640} class="w-100 rounded-lg" src={props.albumImage}/>
        <h4 class="mt-1 mb-1 font-bold">{props.songTitle}</h4>
        <h5 class="text-slate-500">{props.songArtists.join(', ')}</h5>
        <audio src={props.mp3Src} controls/>
    </div>)
})

interface musicCardProps {
    albumImage:string
    songTitle:string
    songArtists:string[]
    mp3Src:string
}

export default MusicCard