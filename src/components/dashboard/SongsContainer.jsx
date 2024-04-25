/* eslint-disable react/prop-types */
import { fetchSpotifyApi } from '../../api/spotifyAPI'
import likeIcon from "../../assets/like-icon.svg"
import likedIcon from "../../assets/liked-icon.svg"
import playIcon from "../../assets/play-icon.svg"
import dotsIcon from "../../assets/dots-icon.svg"

const SongsContainer = ({ songs, setSongSelected, mpActive, setMpActive }) => {
    const HandleLike = (e) => {
        const id = e.target.id
        const like = songs[id].like
        if (like) {
            e.target.src = likeIcon
        } else {
            e.target.src = likedIcon
        }
        songs[id].like = !like
    }

    const HandlePlay = (e) => {
        const id = e.target.id
        setSongSelected(songs[id])
        setMpActive(true)
        handlePlayMusic(songs[id].uri)
    }

    const handlePlayMusic = async (song) => {
        const token = `Bearer ${localStorage.getItem('token')}`
        const data = {
            uris: [song]
        }
        const id_device = `${localStorage.getItem('id_device')}`
        const playSong = await fetchSpotifyApi(
            `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
            'PUT',
            JSON.stringify(data),
            'application/json',
            token
        )
        console.log(playSong)
    }

    const handleToken = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');
        let codeVerifier = localStorage.getItem('code_verifier');
        console.log({ codeVerifier });
        const url = 'https://accounts.spotify.com/api/token';
        const clientId = '4d0d57fca6c94a5882c84526761e0261';
        const redirectUri = 'https://spotify-api-full-song.vercel.app/';
        const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
        };

        const body = await fetch(url, payload);
        const response = await body.json();

        localStorage.setItem('token', response.access_token);
    }

    const getDeviceId = async () => {
        const url = 'https://api.spotify.com/v1/me/player/devices'
        const token = `Bearer ${localStorage.getItem('token')}`
        const response = await fetchSpotifyApi(
            url,
            'GET',
            null,
            'application/json',
            token
        )
        localStorage.setItem('id_device', response.devices[0].id)
    }

    const nameArtists = (index) => {
        const artists = songs[index].artists
        let nameArtists = ''
        artists.forEach((artist, index) => {
            if (index === 0) {
                nameArtists += artist.name
            } else {
                nameArtists += `, ${artist.name}`
            }
        })
        return nameArtists
    }

    return (
        <div className={mpActive ? "flex flex-col mt-5 w-[716px] max-md:w-full max-md:h-2/3 max-md:justify-end max-md:mt-5" : "flex flex-col w-[716px] max-md:w-full max-md:overflow-clip"}>
            {/* Top Songs Container */}
            <div className="flex items-center justify-between mb-3
            max-md:w-full max-md:px-2">
                <h1 className="ml-2 font-medium text-xl">Searched songs</h1>
                <button onClick={handleToken} className="rounded-full bg-[#6464643f] p-3 rotate-90"><img src={dotsIcon} alt="dots" width={"20px"}/></button>
            </div>
            {/* Songs Container Section */}
            <div className={mpActive ? "flex flex-col h-[306px] overflow-x-hidden r-scrollbar max-md:h-[27rem] max-md:pb-0" :
            "flex flex-col h-[534px] overflow-x-hidden r-scrollbar max-md:h-[34rem]"}>
                {/* Songs Mapping */}
                {songs.map((songs, index) => {
                    return (
                        // Song Container
                        <div key={index} className="flex justify-between hover:bg-[#99999931] p-2 rounded-xl song-container">
                            {/* Image & Text Song Container */}
                            <div className="flex w-80
                            max-md:w-9/12">
                                {/* Image */}
                                <div 
                                    style={{'--image-url': `url(${songs.album.images[0].url})`}}
                                    className='w-14 h-14 bg-cover bg-[image:var(--image-url)] rounded-xl'>
                                    {/* Image Background & Play Effects */}
                                    <div className="w-14 h-14 relative flex items-center justify-center rounded-xl song-bg">
                                        <button hidden onClick={HandlePlay} className="song-play"><img id={index} src={playIcon} alt="play" width={"20px"}/></button>
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="flex flex-col justify-center ml-3 overflow-hidden">
                                    <h1 className="font-medium">{songs.name}</h1>
                                    <div className="flex items-center text-nowrap">
                                        <p className="text-black bg-neutral-400 text-xs font-light px-1 pt-0.5 rounded-sm scale-75 -ml-1">LYRICS</p>
                                        <p className="text-gray-300 text-sm text-nowrap max-md:w-36">{nameArtists(index)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Views */}
                            <div className="flex items-center text-gray-300 text-sm
                            max-md:hidden">
                                {songs.popularity}
                            </div>

                            {/* Like & Dots */}
                            <div className="flex items-center w-14">
                                <button onClick={HandleLike}><img id={index} src={likeIcon} alt="like" width={"30px"}/></button>
                                <button onClick={getDeviceId} className="ml-3"><img src={dotsIcon} alt="like" width={"25px"}/></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SongsContainer