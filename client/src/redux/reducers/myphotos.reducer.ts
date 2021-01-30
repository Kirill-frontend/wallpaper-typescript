import { GetOwnPhotoActionType } from "../../utils/actionTypes"
import { GetOwnPhotosReduceType } from "../../utils/reduceTypes"
import { GET_OWN_PHOTOS } from "../consts"

const initialOwnPhoto: GetOwnPhotosReduceType = {
  photos: []
}

export default function getOwnPhotosReduce(state = initialOwnPhoto, action: GetOwnPhotoActionType): GetOwnPhotosReduceType {
  if (action.type === GET_OWN_PHOTOS) {    
    return {...state, photos: action.payload}
  }


  return state
}
