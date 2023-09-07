import { component$ } from "@builder.io/qwik";
import styles from './albumCard.module.css'
import type { ImageObject } from "~/types/spotify";
import useDate from "~/hooks/dateHook";
import { Link } from "@builder.io/qwik-city";


const AlbumCard =  component$(({albumImage,albumTitle,totalTracks,releaseYear,id}:albumCardProps)=>{

    const releaseDate = useDate(new Date(releaseYear),'yyyy')

    return (    
    <div class={styles.card}>
        <img src={albumImage.url} alt={`${albumImage} Album Cover`} width={albumImage.width} height={albumImage.height}/>
        <h2 class={`${styles['card-title']} text-black`}><Link href={`/album/${id}`}>{albumTitle}</Link></h2>
        <div class={styles["album-info"]}>
            <p class={`${styles["info-item"]} text-black`}>Release Year: {releaseDate}</p>
            <p class={`${styles["info-item"]} text-black`}>Total Tracks: {totalTracks}</p>
        </div>
    </div>)
})

interface albumCardProps {
    albumImage:ImageObject
    albumTitle:string
    releaseYear:string
    totalTracks:number
    id:string
}

export default AlbumCard