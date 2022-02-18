import { Dispatch } from 'react'
import { showSnack } from '../../components/SnackBar'

import { request } from '../request'
import { TAsset, TAssetHistory } from '../types'

export enum AssetsActionsTypes {
  GET_ASSETS = 'GET_ASSETS',
  GET_ASSET = 'GET_ASSET',
  UNSET_ASSET = 'UNSET_ASSET',
  SORT_ASSETS = 'SORT_ASSETS',
  GET_HISTORY = 'GET_HISTORY',
}

export enum SortFields {
  rank,
  coin,
  price,
  change,
  vwap,
}

export const getAssets = async (dispatch: Dispatch<{ type: AssetsActionsTypes; payload: TAsset[] }>) => {
  const assets = await request<TAsset[]>(`https://api.coincap.io/v2/assets`, 'GET')

  if (assets.status === 200) {
    dispatch({ type: AssetsActionsTypes.GET_ASSETS, payload: assets.body.data })
  }

  // if (assets.status === 429) {
    // showSnack(dispatch as any, 'Many Requests', 'Wait 1 second')
    // setTimeout(() => getAssets(dispatch), 1000)
  // }
}

export const unsetAsset = (dispatch: Dispatch<{ type: AssetsActionsTypes }>) => {
  dispatch({ type: AssetsActionsTypes.GET_ASSET })
}

export const getAsset = async (dispatch: Dispatch<{ type: AssetsActionsTypes; payload: TAsset }>, id: string) => {
  const asset = await request<TAsset>(`https://api.coincap.io/v2/assets/${id}`, 'GET')

  if (asset.status === 200) {
    dispatch({ type: AssetsActionsTypes.GET_ASSET, payload: asset.body.data })
  }
  // if (asset.status === 429) {
    // showSnack(dispatch as any, 'Many Requests', 'Wait 1 second')
    // setTimeout(() => getAsset(dispatch, id), 1000)
  // }
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
  const assets = await request<TAssetHistory[]>(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`, 'GET')

  if (assets.status === 200) {
    dispatch({ type: AssetsActionsTypes.GET_HISTORY, payload: assets.body.data })
  }
  // if (assets.status === 429) {
    // showSnack(dispatch as any, 'Many Requests', 'Wait 1 second')
    // setTimeout(() => getHistory(dispatch, id), 1000)
  // }
}
