import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';

import { logout, getOwnPhotosAsync } from '../../redux/actions';
import { RootState } from '../../redux/reducers';



const Profile: React.FC = () => {
  const photosLength = useSelector((state: RootState) => state.getOwnPhotosReduce.photos.length)
  const userData = useSelector((state: RootState) => state.authReduce.currentUser)
  const dispatch = useDispatch()
  const [postsCount, setPostsCount] = useState<number>(0)
  

  const logoutHandler = (): void => {
    dispatch(logout())
  }

  useEffect((): void => {
    dispatch(getOwnPhotosAsync())
  }, [dispatch])

  useEffect((): void => {        
      if (photosLength) {
        setPostsCount(photosLength)
      } else {
        setPostsCount(0)
      }    
  }, [photosLength])


  return (
    <>
      <Navbar activeElement="profile" />
      <div className="container">
        <main>
          <ul className="collection">
            <li className="collection-item">
              <div className="profile_card">
                <p>Your email: {userData?.email} </p>
                <p>Your username: {userData?.username} </p>
              </div>
            </li>
            <li className="collection-item">
              <button className="btn-small">
                <Link to="/my">
                  My posts ({postsCount})
              </Link>
              </button>
            </li>
            <li className="collection-item">
              <button className="btn-small" onClick={logoutHandler}>
                Log out
          </button>
            </li>
          </ul>
        </main>
      </div>
    </>
  )
}

export default Profile