import { LoadingActionType } from "../../utils/actionTypes"
import { LoadingReduceType } from "../../utils/reduceTypes"
import { GLOBAL_LOADING_FALSE, GLOBAL_LOADING_TRUE, LOADING_FALSE, LOADING_TRUE } from "../consts"


const initialLoading: LoadingReduceType = {
  loading: false,
  globalLoading: false
}

export default function loadingReduce(state = initialLoading, action: LoadingActionType): LoadingReduceType {
  if (action.type === LOADING_TRUE) {
    return { ...state, loading: true }
  }

  if (action.type === LOADING_FALSE) {
    return { ...state, loading: false }
  }

  if (action.type === GLOBAL_LOADING_TRUE) {
    return {...state, globalLoading: true}
  }

  if (action.type === GLOBAL_LOADING_FALSE) {
    return {...state, globalLoading: false}
  }

  return state
}
