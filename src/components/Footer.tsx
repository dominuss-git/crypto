import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAssets } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'

export const Footer: FC = () => {
  const dispatch = useDispatch()
  const { top3 } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)

  useEffect(() => {
    if (top3.length === 0) {
      getAssets(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <footer className="footer">© 2022 dominuss</footer>
}
