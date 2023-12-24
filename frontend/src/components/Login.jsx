import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from 'react-icons/fc'

import logo from '../assets/logo.png'
import logoWhite from '../assets/logoWhite.png'
import shareMeVideo from '../assets/share.mp4'


import { jwtDecode } from "jwt-decode";
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.credential))

        const { name, sub, picture } = jwtDecode(response.credential);

        // create new user
        const document = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        }

        // add it to sanity
        client.createIfNotExists(document)
            .then(() => {
                navigate('/', { replace: true })
                console.log('Success for login')
            })
    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareMeVideo}
                    type="video/mp4"
                    loop
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
            </div>
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className="p-5">
                    <img src={logoWhite} alt="nexusHub-logo" width={130} />
                </div>
                <div className="shadow-xl">
                    <GoogleLogin
                        // clientId={''}
                        onSuccess={responseGoogle}
                        onError={responseGoogle}
                        theme=""
                        text="signin_with"
                        shape=""
                        ux_mode="popup"
                    />
                </div>
            </div>
        </div>
    )
}

export default Login;