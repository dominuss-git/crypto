import { ReactNode } from 'react'
import { SnackActionsTypes } from '../actions/snackActions'

const InitialState = {
  visible: false,
  title: '',
  content: '',
}

export type TSnack = {
  visible: boolean
  title: string
  content: ReactNode
}

type TSnackAction = { type: SnackActionsTypes; payload: TSnack | undefined }

export const snackReducer = (state = InitialState, action: TSnackAction) => {
  switch (action.type) {
    case SnackActionsTypes.SHOW_SNACK:
      return { ...state, ...action.payload }
    case SnackActionsTypes.HIDE_SNACK:
      return { ...state, ...InitialState }
    default:
      return state
  }
}
