import { DEL_USER, SET_USER } from "../consts"
import { AuthReduceType } from '../../utils/reduceTypes'
import { AuthDelUserActionType, AuthSetUserActionType } from "../../utils/actionTypes"

const initialAuth: AuthReduceType = {
  currentUser: null,
  isAuth: false
}

export default function authReduce(state = initialAuth, action: AuthSetUserActionType | AuthDelUserActionType): AuthReduceType {
  if (action.type === SET_USER) {
    return { ...state, currentUser: action.payload, isAuth: true }
  } else if (action.type === DEL_USER) {
    return { currentUser: null, isAuth: false }
  }

  return state
}
