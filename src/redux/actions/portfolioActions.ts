import { Dispatch } from 'react'

import { TPortfolioProps } from '../reducers/portfolioReducer'
import { TAsset, TPortfolio } from '../types'

export enum PortfolioActionsTypes {
  SET_PORTFOLIO = 'SET_PORTFOLIO',
  SORT_PORTFOLIO = 'SORT_PORTFOLIO'
}

export const setPortfolio = (
  dispatch: Dispatch<{ type: PortfolioActionsTypes; payload: TPortfolioProps }>,
  assets: TAsset[]
) => {
  let cost = 0
  let change = 0
  let raised = 0
  const portfolio = []

  for (let i = 0; true; i++) {
    const key = localStorage.key(i)

    if (!key) {
      break
    }

    const data = JSON.parse(localStorage.getItem(key) as string)

    portfolio.push({ [key]: data })

    const coin = assets.find((val) => val.id === key)

    // eslint-disable-next-line no-loop-func
    data.forEach((val: TPortfolio) => {
      cost += Number(val.valueUSD)
      if (coin) {
        change += Number(val.valueCoins) * Number(coin.priceUsd)
      }
    })
  }

  if (cost !== 0) {
    raised = (change / cost) * 100 - 100
  }

  dispatch({ type: PortfolioActionsTypes.SET_PORTFOLIO, payload: { cost, raised, portfolio } })
}

export const setSortedPortfolio = (
  dispatch: Dispatch<{ type: PortfolioActionsTypes; payload:{ [key: string]: TPortfolio[]; }[] }>,
  portfolio: { [key: string]: TPortfolio[]; }[]
) => {
  dispatch({ type: PortfolioActionsTypes.SORT_PORTFOLIO, payload: portfolio })
}

// export const sortPortfolio = (
//   dispatch: Dispatch<{ type: PortfolioActionsTypes; payload: { field: SortFields; down: boolean } }>,
//   assets: TAsset[],
//   sortBy: { field: SortFields; down: boolean }
// ) => {
//   dispatch({ type: PortfolioActionsTypes.SORT_PORTFOLIO, payload: sortBy })
// }


// export const addToPortfolio = (
//   dispatch: Dispatch<{ type: PortfolioActionsTypes; payload: TPortfolioProps }>,
//   assets: TAsset[],
//   form: TForm,
//   id: string
// ) => {
//   const portfolio = localStorage.getItem(id)

//   if (portfolio) {
//     const data = JSON.parse(portfolio)
//     data.push({ valueUSD: form.value, valueCoins: form.coin, price: coin?.priceUsd })
//     localStorage.setItem(id, JSON.stringify(data))
//   } else {
//     localStorage.setItem(id, JSON.stringify([{ valueUSD: form.value, valueCoins: form.coin, price: coin?.priceUsd }]))
//   }

//   setPortfolio(dispatch, assets)
// }
