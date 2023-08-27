const apiUrl = "https://api.spotify.com"

const searchSong = async (searchTerm:string,token:string)=>{
    const res = await fetch(`${apiUrl}/v1/search?q=${searchTerm}&type=track&market=GR`,{
        headers:{Accept:'application/json',Authorization:`Bearer ${token}`}
    })
    return await res.json();
}

export default searchSong;