import { LikePhoto } from "../../utils/actionTypes"
import { LikeReduceType } from "../../utils/reduceTypes"
import { LIKE_A_PHOTO, UNLIKE_A_PHOTO } from "../consts"

const initialState: LikeReduceType = {
  message: ''
}

export default function likeReduce(state = initialState, action: LikePhoto): LikeReduceType {

  if (action.type === LIKE_A_PHOTO) {
    return {...state, message: 'Photo has been liked'}
  } else if (action.type === UNLIKE_A_PHOTO) {
    return {...state, message: 'ERROR in like a phoyo'}
  }

  return state
}