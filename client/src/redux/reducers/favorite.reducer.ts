import { FavoriteActionType } from "../../utils/actionTypes"
import { FavoriteReduceType } from "../../utils/reduceTypes"
import { GET_FAVORITES } from "../consts"


const initialFav: FavoriteReduceType = {
  favorites: []
}

export default function favoriteReduce(state = initialFav, action: FavoriteActionType): FavoriteReduceType {
  if (action.type === GET_FAVORITES) {
    return { ...state, favorites: action.payload }
  }

  return state
}
