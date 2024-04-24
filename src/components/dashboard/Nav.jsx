import spotifyIcon from "../../assets/spotify-icon.png"

const Nav = () => {
    return (
        <section className="flex m-10 rounded-3xl bg-[#183624] backdrop-blur-sm shadow-[0_4px_30px_-15px_rgba(0,0,0,0.1)] border-2 border-[#79ff803f]
        max-md:m-0 max-md:border-x-0 max-md:border-t-0 max-md:rounded-none">
            <div className="flex flex-col justify-between m-10
            max-md:flex-row max-md:m-4 max-md:w-full max-md:items-center">
                {/* Logo */}
                <div className="flex items-center justify-center">
                    <img src={spotifyIcon} alt="spotify" width={"50px"}/>
                    <h1 className="ml-1 text-green-500 font-bold text-3xl">Spotify</h1>
                </div>

                {/* Log Out */}
                <a href="/">
                    <h1 className="bg-[#6d6d6d4f] w-40 py-1 text-[#c50000] font-medium text-xl text-center border-2 border-[#126b1579] hover:border-[#79ff803f] rounded-3xl hover:bg-[#ffffff21]
                    max-md:w-28">
                        Log Out
                    </h1>
                </a>
            </div>
        </section>
    )
}

export default Nav