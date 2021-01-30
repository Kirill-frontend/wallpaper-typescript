import { ToastViewActionType, ToastHideActionType } from "../../utils/actionTypes"
import { ToastReduceType } from "../../utils/reduceTypes"
import { TOAST_HIDE, TOAST_VIEW } from "../consts"

const initialToast: ToastReduceType = {
  message: '',
  show: false
}

export default function toastReduce(state = initialToast, action: ToastViewActionType | ToastHideActionType): ToastReduceType {
  if (action.type === TOAST_VIEW) {
    return { ...state, message: action.payload, show: true }
  } else if (action.type === TOAST_HIDE) {
    return {...state, show: false}
  }

  return state
}
