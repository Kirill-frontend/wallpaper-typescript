import { SearchActonType } from "../../utils/actionTypes"
import { SearchReduceType } from "../../utils/reduceTypes"
import { GET_SEARCHED } from "../consts"

const initialSearch: SearchReduceType = {
  searched: []
}

export default function searchReduce(state = initialSearch, action: SearchActonType): SearchReduceType {
  if (action.type === GET_SEARCHED) {
    return {...state, searched: action.payload}
  }

  return state
}