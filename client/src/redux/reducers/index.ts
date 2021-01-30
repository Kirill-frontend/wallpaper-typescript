import { combineReducers } from "redux"
import galleryReduce from './gallery.reducer'
import loadingReduce from './loading.reducer'
import authReduce from './auth.reducer'
import toastReduce from './toast.reducer'
import favoriteReduce from './favorite.reducer'
import getOwnPhotosReduce from './myphotos.reducer'
import searchReduce from './search.reducer'

export const rootReducer = combineReducers({
  galleryReduce,
  loadingReduce,
  authReduce,
  toastReduce,
  favoriteReduce,
  getOwnPhotosReduce,
  searchReduce
})

export type RootState = ReturnType<typeof rootReducer>