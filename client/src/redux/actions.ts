import {
  INIT_PHOTO_POST, LOADING_TRUE, LOADING_FALSE, TOAST_VIEW, SET_USER, DEL_USER,
  GET_FAVORITES, GET_OWN_PHOTOS, TOAST_HIDE, GET_SEARCHED, GLOBAL_LOADING_TRUE,
  GLOBAL_LOADING_FALSE
} from "./consts";
import request from '../libs/request'
import { AppThunk, AuthDelUserActionType, AuthSetUserActionType, FavoriteActionType, GalleryActionType, GetOwnPhotoActionType, LoadingActionType, SearchActonType, ToastHideActionType, ToastViewActionType } from "../utils/actionTypes";
import { CurrentUserType, PostType } from "../utils/types";

const photoGetURL = 'http://localhost:5000/api/photo/posts'
const photoPostURL = 'http://localhost:5000/upload/new'
const favoriteURL = 'http://localhost:5000/favorite'
const authURL = 'http://localhost:5000/api/auth'
const nativeUrl = 'http://localhost:5000'


// ----- Async functions


// Photos functions

export function initPhotosAsync(): AppThunk {
  return async (dispatch) => {
    dispatch(beginLoading())
    const res = await request(photoGetURL)
    dispatch(endLoading())
    dispatch(initPhotos(res))
  }
}

export function addPhotoAsync(form: HTMLFormElement): AppThunk {
  return async (dispatch) => {
    dispatch(beginLoading())
    const res = await fetch(photoPostURL, {
      method: 'POST',
      body: new FormData(form)
    })
    const json = await res.json()
    dispatch(endLoading())
    dispatch(toastView(json.message))
  }
}

export function getOwnPhotosAsync(): AppThunk {
  return async (dispatch) => {
    try {
      dispatch(beginLoading())
      const res = await fetch(nativeUrl + '/api/photo/getmyphotos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const json = await res.json()
      dispatch(endLoading())
      dispatch(getOwnPhotos(json))
    } catch (e) {
      console.log(e);
    }

  }
}

export function deletePhotoAsync(post: PostType): AppThunk {
  return async (dispatch) => {
    console.log(post);
    const shoudDelete = window.confirm(`You sure delete ${post.title}`)
    if (shoudDelete) {
      dispatch(beginLoading())
      const res = await fetch(nativeUrl + '/api/photo/delete', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      dispatch(toastView(json.message))
      console.log(json.posts);
      dispatch(getOwnPhotos(json.posts))
      dispatch(endLoading())
    }
  }
}

export function downloadPhoto(post: PostType): AppThunk {
  return async (dispatch) => {
    console.log(post);
    const filename = post.photo.split('/')[4]
    const res = await fetch(`${nativeUrl}/download/${filename}`)

    if (!res.ok) {
      dispatch(toastView('Error when try download file'))
    }

    const blob = await res.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()

    dispatch(toastView('Download file started'))
  }
}


// Favorites

export function addToFavoriteAsync(post: PostType): AppThunk {
  return async (dispatch) => {
    const res = await fetch(favoriteURL + '/add', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await res.json()
    dispatch(toastView(json.message))
    dispatch(getFavorites(json.favorites))
  }
}

export function removeFromFavoriteAsync(post: PostType): AppThunk {
  return async (dispatch) => {
    const res = await fetch(favoriteURL + '/remove', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await res.json()
    dispatch(toastView(json.message))
    dispatch(getFavorites(json.favorites))
  }
}

export function getFavoritesAsync(): AppThunk {
  return async (dispatch) => {
    dispatch(beginLoading())
    const res = await fetch(favoriteURL + '/get', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const json = await res.json()
    dispatch(endLoading())
    dispatch(getFavorites(json))
  }
}

// Auth functions

export function authAsync(): AppThunk {
  return async (dispatch: (dispatch: { type: string; payload?: any; }) => void) => {
    try {
      dispatch(beginGlobalLoading())
      const res = await fetch(`${authURL}/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const json = await res.json()
      dispatch(endGlobalLoading())
      if (res.statusText === 'Unauthorized') {
        localStorage.removeItem('token')
        dispatch(delUser())
        return false
      }
      dispatch(setUser(json.user))
    } catch (e) {
      console.log(e)
    }
  }
}

export function login(email: string, password: string): AppThunk {
  return async (dispatch) => {
    try {
      const res = await request(`${authURL}/login`, 'POST', {
        email, password
      })

      localStorage.setItem('token', res.token)
      dispatch(setUser(res))
      dispatch(toastView(res.message))
      window.location.href = '/'
    } catch (e) {
      console.log(e)
    }
  }
}

export function registration(email: string, password: string, username: string): AppThunk {
  return async (dispatch) => {
    try {
      const res = await request(`${authURL}/registation`, 'POST', { email, password, username })
      dispatch(toastView(res.message))
      window.location.href = '/auth'
    } catch (e) {
      console.log(e);
      throw e
    }
  }
}

export function logout(): AppThunk {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch(delUser())
    window.location.href = '/auth'
  }
}

// Search function 

export function searchBeginAsync(criteria: string): AppThunk {
  return async (dispatch) => {
    dispatch(beginLoading())
    const res = await fetch(nativeUrl + `/search/search?search=${criteria}`)
    const json = await res.json()
    dispatch(getSearched(json))
    dispatch(endLoading())
  }
}

// Feedback function

export function feedbackSendAsync(message: string): AppThunk {
  return async dispatch => {
    dispatch(beginLoading())
    const res = await fetch(nativeUrl + '/api/feedback/', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!res.ok) {
      console.log('Error');
      dispatch(endLoading())

    }
    const json = await res.json()
    console.log(json);
    dispatch(endLoading())
  }
}


// ----- Sync functions


// Loading function
export function beginLoading(): LoadingActionType {
  return { type: LOADING_TRUE }
}

export function endLoading(): LoadingActionType {
  return { type: LOADING_FALSE }
}

export function beginGlobalLoading(): LoadingActionType {
  return { type: GLOBAL_LOADING_TRUE }
}

export function endGlobalLoading(): LoadingActionType {
  return { type: GLOBAL_LOADING_FALSE }
}

// Photo function
export function initPhotos(posts: PostType[]): GalleryActionType {
  return { type: INIT_PHOTO_POST, payload: posts }
}

export function getOwnPhotos(photos: PostType[]): GetOwnPhotoActionType {
  return { type: GET_OWN_PHOTOS, payload: photos }
}

// Auth functions
export function setUser(user: CurrentUserType): AuthSetUserActionType {
  return { type: SET_USER, payload: user }
}

export function delUser(): AuthDelUserActionType {
  return { type: DEL_USER }
}

// Toasts functions
export function toastView(message: string): ToastViewActionType {
  return { type: TOAST_VIEW, payload: message }
}

export function toastHide(): ToastHideActionType {
  return { type: TOAST_HIDE }
}

// Favorite functions
export function getFavorites(favorites: PostType[]): FavoriteActionType {
  return { type: GET_FAVORITES, payload: favorites }
}

// Search functions
export function getSearched(searchResult: PostType[]): SearchActonType {
  return { type: GET_SEARCHED, payload: searchResult }
}

