import { AssetsActionsTypes, SortFields } from '../actions/assetsActions'
import { Coin, TAsset, TAssetHistory } from '../types'

export type TAssetProps = { assets: TAsset[]; top3: Coin[]; history: TAssetHistory[] | null; current: TAsset | null }

const InitialState: TAssetProps = {
  assets: [],
  history: null,
  top3: [],
  current: null,
}

type TAssetsAction = { type: AssetsActionsTypes; payload: TAsset[] }
type TAssetSortAction = { type: AssetsActionsTypes; payload: { field: SortFields; down: boolean } }
type TAssetsHistoryAction = { type: AssetsActionsTypes; payload: History[] }

export const assetsReducer = (
  state = InitialState,
  action: TAssetsAction | TAssetSortAction | TAssetsHistoryAction
) => {
  switch (action.type) {
    case AssetsActionsTypes.GET_ASSETS:
      const top3 = (action.payload as TAsset[]).slice(0, 3)

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
    case AssetsActionsTypes.GET_ASSET:
      return { ...state, current: action.payload }
    case AssetsActionsTypes.UNSET_ASSET:
      return { ...state, current: null }
    case AssetsActionsTypes.GET_HISTORY:
      return { ...state, history: action.payload }
    case AssetsActionsTypes.SORT_ASSETS:
      const { field, down } = action.payload as { field: SortFields; down: boolean }

      if (field === SortFields.price) {
        state.assets.sort((a, b) => {
          if (Number(a.priceUsd) >= Number(b.priceUsd)) {
            return down ? -1 : 1
          } else {
            return down ? 1 : -1
          }
        })
      }
      if (field === SortFields.change) {
        state.assets.sort((a, b) => {
          if (Number(a.changePercent24Hr) >= Number(b.changePercent24Hr)) {
            return down ? -1 : 1
          } else {
            return down ? 1 : -1
          }
        })
      }
      if (field === SortFields.rank) {
        state.assets.sort((a, b) => {
          if (Number(a.rank) >= Number(b.rank)) {
            return down ? -1 : 1
          } else {
            return down ? 1 : -1
          }
        })
      }
      if (field === SortFields.coin) {
        state.assets.sort((a, b) => {
          if (a.symbol >= b.symbol) {
            return down ? 1 : -1
          } else {
            return down ? -1 : 1
          }
        })
      }
      if (field === SortFields.vwap) {
        state.assets.sort((a, b) => {
          if (Number(a.vwap24Hr) >= Number(b.vwap24Hr)) {
            return down ? 1 : -1
          } else {
            return down ? -1 : 1
          }
        })
      }
      return { ...state }
    default:
      return state
  }
}
