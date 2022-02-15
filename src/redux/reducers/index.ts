import { combineReducers } from 'redux'
import { assetsReducer, TAssetProps } from './assetsReducer'
import { snackReducer, TSnack } from './snackReducer'

export const rootReducer = combineReducers({
  assets: assetsReducer,
  snack: snackReducer,
})

export type TReducers = {
  assets: TAssetProps
  snack: TSnack
}
