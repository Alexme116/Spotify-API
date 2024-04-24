

const Wrapped = () => {
    return (
        <div className="mb-10 ml-10 flex flex-col max-md:hidden">
            {/* Wrapped Text */}
            <div className="flex justify-between items-center">
                <h1 className="font-medium text-lg">Wrapped</h1>
                <a className="text-green-500 text-xs" href="">View All {'>'}</a>
            </div>

            {/* Wrapped Container */}
            <div className="mt-3 grid grid-rows-3 gap-y-4">
                <a href="https://newsroom.spotify.com/2023-11-29/top-songs-artists-podcasts-albums-trends-2023/">
                    <div className="w-auto h-40 px-28 rounded-3xl bg-cover bg-[url('https://mir-s3-cdn-cf.behance.net/projects/404/292a6f182515879.Y3JvcCw5OTksNzgyLDAsMTgw.png')]">
                    </div>
                </a>
                <a href="https://newsroom.spotify.com/2023-11-29/wrapped-user-experience-2023/">
                    <div className="w-auto h-40 px-28 rounded-3xl bg-cover bg-[url('https://www.campustimes.org/wp-content/uploads/2022/12/Sunahra_Tanvir_SpotifyWrapped_CT.png')]">
                    </div>
                </a>
                <a href="https://newsroom.spotify.com/2023-wrapped/">
                    <div className="w-auto h-40 px-28 rounded-3xl bg-cover bg-[url('https://mir-s3-cdn-cf.behance.net/projects/404/65915a187908103.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png')]">
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Wrapped