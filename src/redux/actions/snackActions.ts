import { Dispatch } from 'react'

import { TSnack } from '../reducers/snackReducer'

export enum SnackActionsTypes {
  SHOW_SNACK = 'SHOW_SNACK',
  HIDE_SNACK = 'HIDE_SNACK',
}

export const showSnack = (dispatch: Dispatch<{ type: SnackActionsTypes; payload: TSnack }>, props: TSnack) => {
  dispatch({ type: SnackActionsTypes.SHOW_SNACK, payload: props })
}

export const hideSnack = (dispatch: Dispatch<{ type: SnackActionsTypes; payload?: TSnack }>) => {
  dispatch({ type: SnackActionsTypes.HIDE_SNACK })
}
