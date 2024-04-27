import { useState, useEffect } from "react"
import MusicPlayer from "./MusicPlayer"
import SongsContainer from "./SongsContainer"
import TopBar from "./TopBar"
import Nav from "./Nav"
import Wrapped from "./Wrapped"
import songsDefault from './ObjetoCanciones'
import { useNavigate } from "react-router"


const DashBoard = () => {
    const [songSelected, setSongSelected] = useState({})
    const [songs, setSongs] = useState(songsDefault)
    const [mpActive, setMpActive] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const codeVerifier = localStorage.getItem('code_verifier')
        if ( codeVerifier == null || codeVerifier == "undefined") {
            navigate('/register')
        }
    })

    return (
        // Main Container Background
        <div className="flex items-center justify-center h-screen text-white bg-gradient-to-b from-[#3a6d3f] to-[#030f04]
        max-md:h-[100svh]">
            {/* Main Section */}
            <div className="border-4 rounded-3xl flex bg-[#17251C] border-[#ffffff71] shadow-xl shadow-[#467c4475] h-[47rem] overflow-hidden
            max-md:h-full max-md:w-full max-md:border-none max-md:rounded-none max-md:flex-col"> 
                {/* Nav */}
                <Nav />

                {/* Main Section */}
                <section className="flex flex-col mt-10 mr-10
                max-md:m-0 max-md:mt-5 max-md:h-full overflow-clip">
                    {/* Top Bar */}
                    <TopBar setSongs={setSongs} songSelected={songSelected} />

                    {/* Main Content */}
                    <div className="flex justify-between mt-5 -mb-0.5
                    max-md:m-0 max-md:h-full max-md:overflow-clip">
                        {/* Music Content */}
                        <div  className={mpActive ? "flex flex-col justify-between pb-40 w-[716px] max-md:pb-0 max-md:h-full" :
                        "flex flex-col justify-between pb-40 w-[716px] max-md:pb-0 max-md:h-full max-md:overflow-clip max-md:justify-end"}>
                            {/* Music Player */}
                            <MusicPlayer songSelected={songSelected} mpActive={mpActive} />

                            {/* Songs Container */}
                            <SongsContainer songs={songs} songSelected={songSelected} setSongSelected={setSongSelected} mpActive={mpActive} setMpActive={setMpActive} />
                        </div>

                        {/* Wrapped Content */}
                        <Wrapped />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DashBoard