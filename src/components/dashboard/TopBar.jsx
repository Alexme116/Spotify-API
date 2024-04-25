/* eslint-disable react/prop-types */
import { fetchSpotifyApi } from '../../api/spotifyAPI';
import profileImage from '/src/assets/profile-image.png';
import downArrowIcon from '/src/assets/down-arrow-icon.svg';

const TopBar = ({ setSongs, songSelected }) => {
    const form = {
        search: '',
        artist: '',
        type: 'track'
    }

    const handleSearchChange = (e) => {
        form.artist = e.target.value
        handleSearch()
    }

    const handleSearch = async () => {
        const params = new URLSearchParams()

        params.append('q', encodeURIComponent(`remaster artist:${form.search} artist:${form.artist}`))
        params.append('type', form.type)
        params.append('limit', 50)

        const queryString = params.toString()
        const url = 'https://api.spotify.com/v1/search'

        const updateUrl = `${url}?${queryString}`

        const token = `Bearer ${localStorage.getItem('token')}`


        const response = await fetchSpotifyApi(
            updateUrl,
            'GET',
            null,
            'application/json',
            token
        )
        reorderByPopularity(response.tracks.items)
    }

    const handleResetSearch =  () => {
        document.getElementById('search').value = ''
    }

    const handlePlayMusic = async () => {
        console.log(songSelected)
        const token = `Bearer ${localStorage.getItem('token')}`
        const data = {
            uris: [songSelected.uri]
        }
        const id_device = '627e8d1e09a9c92348cac12d9da9b34c9775a876'
        const playSong = await fetchSpotifyApi(
            `https://api.spotify.com/v1/me/player/play?device_id=${id_device}`,
            'PUT',
            JSON.stringify(data),
            'application/json',
            token
        )
        console.log(playSong)
    }

    const reorderByPopularity = (songs) => {
        const sortedSongs = songs.sort((a, b) => {
            return b.popularity - a.popularity
        })
        setSongs(sortedSongs)
    }

    return (
        <div className="flex justify-between mb-10 relative
        max-md:w-full max-md:mb-5 max-md:justify-center">
            {/* Search Bar */}
            <div className='flex justify-between w-[50rem]
            max-md:flex max-md:w-full'>
                <input
                    id="search"
                    type="text"
                    placeholder="Search for artist, and then song..."
                    onChange={handleSearchChange}
                    onKeyDown={ (e) => { if (e.key === 'Enter') handleResetSearch() } }
                    className="w-[50rem] h-14 pl-14 pr-4 placeholder:text-white bg-[url('/src/assets/search-icon.svg')] bg-no-repeat bg-[8px] bg-contain
                        rounded-3xl bg-[#183624] backdrop-blur-sm shadow-[0_4px_30px_-15px_rgba(0,0,0,1)] border-2 border-[#79ff803f] outline-none
                        max-md:w-full max-md:mx-5"
                />
            </div>

            {/* Profile */}
            <div id="profile-container" className="flex items-center justify-center rounded-3xl bg-[#183624] backdrop-blur-sm shadow-[0_4px_30px_-15px_rgba(0,0,0,0.1)] border-2 border-[#79ff803f]
            max-md:hidden">
                <div className="flex justify-center items-center">
                    <button id="profile-logo" className="z-10"><img src={profileImage} alt="profile" width="40px" className="rounded-full" /></button>
                    <button onClick={handlePlayMusic} id="arrow-icon" className="absolute z-0"><img src={downArrowIcon} alt="arrow" width="30px" /></button>
                </div>
            </div>
        </div>
    )
}

export default TopBar;