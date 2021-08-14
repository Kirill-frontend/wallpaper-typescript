import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { CREATE_PHOTO_POST, DEL_USER, FAVORITES, GET_FAVORITES, GET_OWN_PHOTOS, GET_SEARCHED, GLOBAL_LOADING_FALSE, GLOBAL_LOADING_TRUE, INIT_PHOTO_POST, LIKE_A_PHOTO, LOADING_FALSE, LOADING_TRUE, SET_PHOTOS, SET_USER, TOAST_HIDE, TOAST_VIEW, UNLIKE_A_PHOTO } from "../redux/consts";
import { RootState } from "../redux/reducers";
import { CurrentUserType } from "./types";
import { PostType } from "./types";

export type GalleryActionType = {
  type: typeof INIT_PHOTO_POST | typeof CREATE_PHOTO_POST | typeof FAVORITES | typeof SET_PHOTOS
  payload: Array<PostType>
}

export type AuthSetUserActionType = {
  type: typeof SET_USER 
  payload: CurrentUserType  
}

export type AuthDelUserActionType = {
  type: typeof DEL_USER
}

export type FavoriteActionType = {
  type: typeof GET_FAVORITES
  payload: Array<PostType>
}

export type LoadingActionType = {
  type: typeof LOADING_TRUE | typeof LOADING_FALSE | 
        typeof GLOBAL_LOADING_FALSE | typeof GLOBAL_LOADING_TRUE
}

export type GetOwnPhotoActionType = {
  type: typeof GET_OWN_PHOTOS
  payload: Array<PostType>
}

export type SearchActonType = {
  type: typeof GET_SEARCHED
  payload: Array<PostType>
}

export type ToastViewActionType = {
  type: typeof TOAST_VIEW 
  payload: string
}

export type ToastHideActionType = {
  type: typeof TOAST_HIDE  
}

export type LikePhoto = {
  type: typeof LIKE_A_PHOTO | typeof UNLIKE_A_PHOTO
  payload: string // Photo ID
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>