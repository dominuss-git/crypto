import { AssetsActionsTypes } from '../actions/assetsActions'
import { Coin, TAsset } from '../types'

export type TAssetProps = { assets: TAsset[]; top3: Coin[] }

const InitialState: TAssetProps = {
  assets: [],
  top3: [],
}

type TAssetsAction = { type: AssetsActionsTypes; payload: TAsset[] }

export const assetsReducer = (state = InitialState, action: TAssetsAction) => {
  switch (action.type) {
    case AssetsActionsTypes.GET_ASSETS:
      console.log(action.payload)
      const top3 = action.payload.slice(0, 3)

      return {
        ...state,
        assets: action.payload,
        top3: top3.map((val) => {
          return {
            name: val.symbol,
            rank: val.rank,
            price: Number(val.priceUsd).toFixed(2),
          }
        }),
      }
    default:
      return state
  }
}
