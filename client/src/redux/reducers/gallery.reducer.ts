import { GalleryActionType } from "../../utils/actionTypes"
import { PostType } from "../../utils/types"
import { CREATE_PHOTO_POST, FAVORITES, INIT_PHOTO_POST } from "../consts"

type InitialGalleryStateType = {
  posts: PostType[]
  favorites: PostType[]
}

const initialState: InitialGalleryStateType = {
  posts: [],
  favorites: []
}

export default function galleryReduce(state = initialState, action: GalleryActionType): InitialGalleryStateType {
  if (action.type === INIT_PHOTO_POST) {    
    return { ...state, posts: action.payload }
  }

  if (action.type === CREATE_PHOTO_POST) {    
    return { ...state, posts: action.payload }
  }

  if (action.type === FAVORITES) {
    return { ...state, favorites: action.payload }
  }

  return state
}