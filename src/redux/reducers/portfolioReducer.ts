import { PortfolioActionsTypes } from '../actions/portfolioActions'
import { TPortfolio } from '../types'

const InitialState = {
  portfolio: null,
  cost: 0,
  raised: 0,
}

export type TPortfolioProps = {
  portfolio: { [key: string]: TPortfolio[] }[]
  cost: number
  raised: number
}

type TPortfolioAction = { type: PortfolioActionsTypes; payload: TPortfolioProps | undefined }
// type TAssetSortAction = { type: PortfolioActionsTypes; payload: { field: SortFields; down: boolean } }

export const portfolioReducer = (state = InitialState, action: TPortfolioAction) => {
  switch (action.type) {
    case PortfolioActionsTypes.SET_PORTFOLIO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}