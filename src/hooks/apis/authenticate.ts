import { routeLoader$ } from "@builder.io/qwik-city";

const authenticate =async (req:any) => {
    var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("client_id", req.env.get("CLIENT_ID"));
urlencoded.append("client_secret", req.env.get("CLIENT_SECRET"));

    const res  = await fetch("https://accounts.spotify.com/api/token",{
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        method:"POST",
        body:urlencoded
    })
    return await res.json()
}

export default authenticate;