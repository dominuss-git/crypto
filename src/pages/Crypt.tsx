import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getHistory } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import '../styles/pages.scss'
import { Spinner } from '../components/Spinner'

import '../styles/pages.scss'
import { TAssetHistory } from '../redux/types'
import { Chart } from '../components/Chart'

export const Crypt: FC = () => {
  const { history } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const dispatch = useDispatch()
  const [data, setData] = useState<any>(null)

  const location = useLocation()

  useEffect(() => {
    getHistory(dispatch, location.pathname.split('/')[1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(history)
    if (history) {
      const data = (history as TAssetHistory[]).map((val) => ({
        x: new Date(val.time).toLocaleDateString(),
        y: Number(Number(val.priceUsd).toFixed(2)),
      }))

      const id = location.pathname.split('/')[1]

      setData({ id, data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  if (!data) {
    return (
      <div className="content">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="content">
      <h2>{location.pathname.split('/')}</h2>
      <Chart data={[data]} />
    </div>
  )
}
