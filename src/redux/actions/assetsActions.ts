import { Dispatch } from 'react'
import { request } from '../request'
import { TAsset, TAssetHistory } from '../types'

export enum AssetsActionsTypes {
  GET_ASSETS = 'GET_ASSETS',
  GET_ASSET = 'GET_ASSET',
  SORT_ASSETS = 'SORT_ASSETS',
  GET_HISTORY = 'GET_HISTORY',
}

export enum SortFields {
  rank,
  coin,
  price,
  change,
}

export const getAssets = async (dispatch: Dispatch<{ type: AssetsActionsTypes; payload: TAsset[] }>) => {
  // dispatch({ type: SET_LOADER, payload: null });

  await request<TAsset[]>(`https://api.coincap.io/v2/assets`, 'GET').then((assets) => {
    if (assets.status === 200) {
      dispatch({ type: AssetsActionsTypes.GET_ASSETS, payload: assets.body.data })
    }
    // dispatch({ type: SHOW_TOAST, payload: products.body.message })
  })
  // dispatch({ type: UNSET_LOADER, payload: null });
}

export const sortAssets = (
  dispatch: Dispatch<{ type: AssetsActionsTypes; payload: { field: SortFields; down: boolean } }>,
  sortBy: { field: SortFields; down: boolean }
) => {
  dispatch({ type: AssetsActionsTypes.SORT_ASSETS, payload: sortBy })
}

export const getHistory = async (
  dispatch: Dispatch<{ type: AssetsActionsTypes; payload: TAssetHistory[] }>,
  id: string
) => {
  await request<TAssetHistory[]>(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`, 'GET').then((assets) => {
    if (assets.status === 200) {
      dispatch({ type: AssetsActionsTypes.GET_HISTORY, payload: assets.body.data })
    }
  })
}
