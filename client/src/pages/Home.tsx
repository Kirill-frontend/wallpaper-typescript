import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { downloadPhoto, getFavoritesAsync, initPhotosAsync } from '../redux/actions'

import Navbar from '../components/Navbar';
import Photo from '../components/Photo';
import Loader from '../components/Loader';
import Nothing from '../components/Nothing';

import { PostType } from '../utils/types';
import { RootState } from '../redux/reducers';

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    dispatch(initPhotosAsync())
    dispatch(getFavoritesAsync())
  }, [dispatch])

  const posts = useSelector((state: RootState) => (state.galleryReduce.posts))
  const isLoading = useSelector((state: RootState) => (state.loadingReduce.loading))

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  const messageForNothing =
    (<>
      <span className="nothing-text_span">No posts</span>
      <Link to='/create'>You can create own post</Link>
    </>)

  const downloadHandler = (options: PostType): void => {
    dispatch(downloadPhoto(options))
  }


  return (
    <>
      <Navbar activeElement="home" />
      <div className="container">
        <main>
          <ul className="collection">
            {loading && <Loader />}
            {posts.length ? posts.map((post: PostType) =>
              (<Photo key={post.id}
                options={post}
                handlers={{
                  downloadHandler
                }}
              />))
              :
              <Nothing>{messageForNothing}</Nothing>}
          </ul>
        </main>
      </div>
    </>
  )
}

export default Home