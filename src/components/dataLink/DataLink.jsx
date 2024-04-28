import { useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchSpotifyApi } from "../../api/spotifyAPI";
import { authFLow, getDataAuth } from '../../setup';
import spotifyIcon from "../../assets/spotify-icon.png";
import verifierIcon from "../../assets/verifier-icon.svg";
import lockIcon from "../../assets/lock-icon.svg";
import lockedIcon from "../../assets/locked-icon.svg";
import linkIcon from "../../assets/link-icon.svg";
import syncIcon from "../../assets/sync-icon.svg";

const DataLink = () => {

    const navigate = useNavigate()

    const handleCodeVerifier = async() => {
        const codeChallengeProm = await getDataAuth()
        authFLow(codeChallengeProm)
    }

    const handleToken = async () => {
        const token = window.localStorage.getItem('token')
        const spotifyLink = document.getElementById("spotifyLink")
        const syncDevice = document.getElementById("syncDevice")
        const lock = document.getElementById("tokenLock")
        lock.src = lockIcon
        spotifyLink.style.display = "flex"
        syncDevice.style.display = "flex"

        if (token == "undefined" || token == null) {
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            let codeVerifier = localStorage.getItem('code_verifier');
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
    }

    const handleSpotifyLink = () => {
        window.open('https://open.spotify.com/', '_blank')
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

    const handleDashboard = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('id_device')
    })

    return (
        <div className="h-[100svh] bg-black text-white flex justify-center items-center m-0">
            <div className="w-[30rem] rounded-3xl flex justify-center bg-[#2E2F33] max-sm:scale-75">
                <div className="flex flex-col items-center m-14">
                    <div className="flex justify-center">
                        <img src={spotifyIcon} alt="spotify" width={"60px"}/>
                        <h1 className="self-center ml-5 font-bold text-4xl">Spotify</h1>
                    </div>
                    <div className="flex flex-col items-center mt-10">
                        <button onClick={handleCodeVerifier}><img src={verifierIcon} alt="verifier" width={"50px"} /></button>
                        <h1 className="font-bold text-xl">Code Verifier</h1>
                    </div>
                    <div className="flex flex-col items-center mt-10">
                        <button onClick={handleToken}><img id="tokenLock" src={lockedIcon} alt="lock" width={"50px"} /></button>
                        <h1 className="font-bold text-xl">Get Token</h1>
                    </div>
                    <div id="spotifyLink" className="hidden flex-col items-center mt-5">
                        <button onClick={handleSpotifyLink}><img src={linkIcon} alt="link" width={"50px"} /></button>
                        <h1 className="font-bold text-xl">Open Spotify</h1>
                    </div>
                    <div id="syncDevice" className="hidden flex-col items-center mt-5">
                        <button onClick={getDeviceId}><img src={syncIcon} alt="sync" width={"50px"} /></button>
                        <h1 className="font-bold text-xl">Sync Device</h1>
                    </div>
                    <div className="mt-10">
                        <button onClick={handleDashboard} className="bg-green-600 rounded-full font-bold text-2xl px-4 py-2">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataLink