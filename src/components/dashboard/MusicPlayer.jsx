/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import soundIcon from "../../assets/sound-icon.svg"
import soundOffIcon from "../../assets/sound-off-icon.svg"
import playIcon from "../../assets/play-icon.svg"
import pauseIcon from "../../assets/pause-icon.svg"
import configIcon from "../../assets/config-icon.svg"
import dotsIcon from "../../assets/dots-icon.svg"

const MusicPlayer = ({ songSelected, mpActive }) => {
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(30)
    const [lastVolume, setLastVolume] = useState(30)
    const [timeSong, setTimeSong] = useState("0:00")
    const [songEnd, setSongEnd] = useState(100)

    const HandleSongInit = () => {
        const song = document.getElementById("song")
        setSongEnd(song.duration)
    }

    const HandleSongChanged = () => {
        const token = localStorage.getItem('token')
        if (token == "undefined" || token == null) {
            const song = document.getElementById("song")
            const icon = document.getElementById("play-pause")
            icon.src = pauseIcon
            song.play()
        }
    }

    const HandleSongUpdate = () => {
        const song = document.getElementById("song")
        const timeSong = song.currentTime
        const sec = Math.floor(timeSong % 60)
        const min = Math.floor(timeSong / 60)
        const timeFormat = sec <10 ? min.toString() + ":0" + sec.toString() : min.toString() + ":" + sec.toString()
        setDuration(timeSong)
        setTimeSong(timeFormat)
    }

    const HandleChangeDuration = (e) => {
        const song = document.getElementById("song")
        const timeChanged = e.target.value
        song.currentTime = timeChanged
        setDuration(timeChanged)
    }

    const HandleChangeVolume = (e) => {
        const song = document.getElementById("song")
        const icon = document.getElementById("mute-unmute")
        setVolume(e.target.value)
        song.volume = e.target.value / 100
        if (song.volume > 0) {
            icon.src = soundIcon
            song.muted = false
        } else {
            setLastVolume(e.target.value)
            icon.src = soundOffIcon
        }
    }

    const HandlePlay = () => {
        const song = document.getElementById("song")
        const icon = document.getElementById("play-pause")
        if (song.paused) {
            song.play()
            icon.src = pauseIcon
        } else {
            song.pause()
            icon.src = playIcon
        }
    }

    const HandleMute = () => {
        const song = document.getElementById("song")
        const icon = document.getElementById("mute-unmute")
        if (volume == 0 && lastVolume == 0) {
            song.muted = false
            song.volume = 0.1
            setVolume(10)
            icon.src = soundIcon
        }
        else if (song.muted) {
            song.muted = false
            setVolume(lastVolume)
            icon.src = soundIcon
        } else {
            song.muted = true
            setLastVolume(volume)
            setVolume(0)
            icon.src = soundOffIcon
        }
    }

    useEffect(() => {
        const song = document.getElementById("song")
        song.volume = 0.3
    },[])

    return (
        // Music Player Container
        <div hidden={mpActive ? false : true} id="mp-container"  className="h-52 w-52 self-center rounded-3xl
        bg-no-repeat relative overflow-hidden shadow-[#000000b2] shadow-[1px_1px_30px_10px]
        max-md:w-32 max-md:h-32 max-md:shadow-none">
            <div className="absolute w-full h-full z-0 image-resize">
                <img className="w-full h-full blur-xl" src={mpActive ? songSelected.album.images[0].url : "NaN"} alt={mpActive ? songSelected.name : "NaN"} />
            </div>
            {/* Music Player */}
            <div className="h-max flex flex-col justify-between m-5
            max-md:h-full max-md:justify-end">
                {/* Music Player Controls */}
                <div className="flex h-11 z-10 items-center justify-end mp-items-unhide
                max-md:hidden">
                    <button className="w-11 h-11 bg-[#ffffff50] rounded-full rotate-90 flex items-center justify-center">
                        <img src={configIcon} alt="config" width={"27px"}/>
                    </button>
                    <button className="ml-2 w-11 h-11 p-2 bg-[#ffffff50] rounded-full rotate-90">
                        <img src={dotsIcon} alt="dots"/>
                    </button>
                </div>

                {/* Music Player Volume */}
                <div className="flex flex-col w-10 h-36 z-10 justify-between items-center change-bar mp-items-unhide
                max-md:hidden">
                    <input type="range" min={0} max={100} value={volume} onChange={HandleChangeVolume}
                    className="rounded-full h-1 w-24 mt-14 -rotate-90 appearance-none bg-[#ffffff73] cursor-pointer"/>
                    <button onClick={HandleMute} className="w-5 h-5 mb-1"><img id="mute-unmute" src={soundIcon} alt="sound"/></button>
                </div>

                {/* Music Player Progress Bar */}
                <audio hidden controls preload="metadata" src={songSelected.preview_url} id="song" onLoadStart={HandleSongChanged} onCanPlay={HandleSongInit} onTimeUpdate={HandleSongUpdate} />
                <div className="flex h-8 z-10 items-center justify-around mp-items-unhide
                max-md:mb-6">
                    <button onClick={HandlePlay} className="w-6 h-6"><img id="play-pause" src={playIcon} alt="play"/></button>

                    <div className="flex items-center w-11/12 change-bar">
                        <p className="text-xs text-white">{timeSong}</p>
                        <input type="range" min={0} max={songEnd} value={duration} onChange={HandleChangeDuration}
                        className="w-full h-1 ml-2 rounded-full appearance-none bg-[#ffffff73] cursor-pointer"/>
                    </div>
                </div>
            </div>
            {/* Song Image MP Center */}
            <div className="absolute h-[19rem] w-[46rem] -top-1 -left-1 bg-[#0000006c]" />
            <div hidden={mpActive ? false : true} id="mp-center-image"
            className="absolute h-52 w-52 rounded-3xl overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            max-md:size-full">
                <img src={mpActive ? songSelected.album.images[0].url : "NaN"} alt={mpActive ? songSelected.name : "NaN"} />
            </div>
        </div>
    )
}

export default MusicPlayer