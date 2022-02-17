import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showSnack } from '../components/SnackBar'
import { getAssets } from '../redux/actions/assetsActions'
import { setPortfolio } from '../redux/actions/portfolioActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'

export const useUpdateAssets = () => {
  const dispatch = useDispatch()
  const { assets } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)

  useEffect(() => {
    getAssets(dispatch)
    const id = setInterval(() => {
      showSnack(dispatch, 'Information Updated', '')
      getAssets(dispatch)
    }, 1 * 60 * 1000)

    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setPortfolio(dispatch, assets)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets])
}
