import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showSnack } from '../components/SnackBar'
import { getAssets } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'

export const useUpdateAssets = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAssets(dispatch)
    const id = setInterval(() => {
      showSnack(dispatch, 'Information Updated', '')
      getAssets(dispatch)
    }, 1 * 60 * 1000)

    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
