import { combineReducers } from 'redux'

import { assetsReducer, TAssetProps } from './assetsReducer'
import { portfolioReducer, TPortfolioProps } from './portfolioReducer'
import { snackReducer, TSnack } from './snackReducer'

export const rootReducer = combineReducers({
  assets: assetsReducer,
  snack: snackReducer,
  portfolio: portfolioReducer,
})

export type TReducers = {
  assets: TAssetProps
  snack: TSnack
  portfolio: TPortfolioProps
}
