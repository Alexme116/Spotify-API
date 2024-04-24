import { useState } from 'react';
import { fetchSpotifyApi } from '/src/api/spotifyAPI.js';
import { useNavigate } from 'react-router-dom';
import spotifyIcon from '/src/assets/spotify-icon.png';

const Register = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleReload = () => {
        navigate(0)
    }

    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async() => {
        const cliend_id = '4d0d57fca6c94a5882c84526761e0261'
        const client_secret = '1576ee16cbf24853b74494d342c394c9'
        const body = 'grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret'
        const url = 'https://accounts.spotify.com/api/token'
        const contentType = 'application/x-www-form-urlencoded'
        const token = 'Basic ' + btoa(cliend_id + ':' + client_secret)

        const response = await fetchSpotifyApi(
            url,
            'POST',
            body,
            contentType,
            token
        )

        localStorage.setItem('token', response.access_token)
        console.log(response)
        navigate('/dashboard')
    }

    return (
        <div style={{backgroundColor: "#121212"}}>
            {/* Main Section */}
            <main className="flex items-center justify-center h-screen">
                <div style={{backgroundColor: "#2E2F33"}} className=" w-[24rem] h-[26rem] flex flex-col text-white rounded-xl shadow-2xl shadow-black max-md:scale-90 lg:scale-125">
                    <div className='h-full m-10 flex flex-col items-center'>
                        <div>
                            {/* Logo */}
                            <div className="flex justify-center">
                                <img src={spotifyIcon} alt="spotify" width={"45px"}/>
                                <h1 className="self-center ml-2 font-bold text-3xl">Spotify</h1>
                            </div>

                            {/* Sing In | Sign Up */}
                            <div className="flex justify-center mt-10">
                                <a onClick={handleReload} style={{cursor:'pointer'}}><h1 className="font-medium mr-10 border-b-2 border-green-500 hover:text-neutral-200">SIGN IN</h1></a>
                                <a href='/'><h1 className="font-medium hover:text-neutral-200">SIGN UP</h1></a>
                            </div>
                        </div>

                        <div className='mt-10'>
                            {/* Email Input */}
                            <div className="flex justify-center">
                                <input className="w-full bg-white rounded-full pl-5 pr-3.5 py-2 text-black outline-none" type='email' placeholder="Username"
                                    onChange={handleOnChange}
                                    value={form.email}
                                    name="email"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="flex justify-center mt-5">
                                <input className="w-full bg-white rounded-full focus:  pl-5 pr-3.5 py-2 text-black outline-none" type='password' placeholder="Password"
                                    onChange={handleOnChange}
                                    value={form.password}
                                    name="password"
                                />
                            </div>

                            {/* Button - Register | Login */}
                            <div className="flex justify-center mt-10">
                                <button
                                        onClick={handleLogin}
                                        className="bg-green-600 hover:bg-green-500 font-bold px-28 py-2 rounded-full w-full shadow-lg shadow-neutral-900 active:shadow-none active:bg-green-600"
                                    >
                                        SIGN UP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Register;