import React, { useState, useEffect } from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component'

import { useDispatch, useSelector } from 'react-redux';
import { addToFavoriteAsync, toastView } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { HandlersType, PostType } from '../utils/types';

import Popup from './Popup';

type PhotoPropsType = {
  options: PostType
  handlers: HandlersType
}


const Photo: React.FC<PhotoPropsType> = ({ options, handlers }) => {
  const [doAnim, setDoAnim] = useState<boolean>(false)
  const [visibility, setVisibility] = useState<boolean>(false)
  const dispatch = useDispatch()

  const { downloadHandler } = handlers

  const isAuth = useSelector((state: RootState) => (state.authReduce.isAuth))
  const favoritePosts = useSelector((state: RootState) => state.favoriteReduce.favorites)

  const favoriteAddHandler = () => {
    if (isAuth) {
      setDoAnim(true)
      setTimeout(() => {
        dispatch(addToFavoriteAsync(options))
        setVisibility(true)
      }, 1000);
    } else {
      dispatch(toastView('You must authorizate for adding wallpaper in favorites'))
    }
  }

  useEffect(() => {
    if (favoritePosts.length) {
      favoritePosts.forEach((item: PostType) => {
        if (item.id === options.id) {
          setVisibility(true)
        }
      })
    }
  }, [favoritePosts, options.id])

  return (
    <>
      <li className="collection-item col s6">
        <div className="card">
          <div className="card-image">
            {/* <img src={options.photo} alt={options.title} onClick={slideShowHandler} /> */}
            <LazyLoadImage 
              src={options.photo}
              alt={options.title}                     
              height='500px'  
            />
            <span className="card-title"> {options.title} </span>
            <span className="card-author "> {options.author} </span>
            {visibility ? '' : (<button className={`btn-floating halfway-fab waves-effect waves-light red ${doAnim ? 'anim-hidden' : ''}`} onClick={favoriteAddHandler} > <i className="material-icons">favorite_border</i> </button>)}
            <Popup handlers={{ downloadHandler }} statistic={options.statistic} options={options} />
          </div>
        </div>
      </li>
    </>
  )
}

export default Photo