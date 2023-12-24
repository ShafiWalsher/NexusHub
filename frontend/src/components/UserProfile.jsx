import { googleLogout } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'


import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'


const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,abstract,travel'

const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full w-20 ouline-non"
const notActiveBtnStyles = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 ouline-non"

const UserProfile = () => {

  const [user, setuser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created'); // Created || Saved
  const [activeBtn, setActiveBtn] = useState('created');
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleImageLoad = () => {
    // Callback for when the image has loaded
    setImageLoaded(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    <googleLogout />
    navigate('/login');
  }

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) => {
        setuser(data[0])
      })
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data);
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data);
        })
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading profile" />
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            {!imageLoaded && <p className=" mt-32">Loading banner picture...</p>}
            <img
              src={randomImage}
              alt="banner-pic"
              className={`w-full h-370 2xl:h-510 shadow-lg object-cover ${imageLoaded ? 'visible' : 'invisible'
                }`}
              onLoad={handleImageLoad} />

            <img
              src={user.image}
              alt="user-profile-pic"
              className={`rounded-full w-20 h-20 -mt-10 shadow-xl object-cover ${imageLoaded ? 'visible' : 'invisible'
                }`} />
            <h1 className="font-bold text-3xl text-center mt-3"> {user.userName} </h1>
            <div className="absolute top-0 z-1 right-0">
              {userId === user._id && (
                <button
                  type='button'
                  onClick={handleLogout}
                  className="m-2 p-2 bg-white  font-bold rounded-full outline-none cursor-pointer shadow-md"
                >
                  <AiOutlineLogout color="red" fontSize={26} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2 ">
              <MasonryLayout pins={pins} />

            </div>
          ) : (
            text === 'created' ? (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2" > No pins created yet!</div>
            ) : (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2" > No pins saved yet!</div>
            )
          )}

        </div>
      </div>
    </div>
  )
}

export default UserProfile