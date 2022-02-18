import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { getAsset, getHistory, unsetAsset } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { TAssetHistory } from '../redux/types'
import { Chart, TChart } from '../components/Chart'
import { Spinner } from '../components/Spinner'
import { CoinCalculator } from '../components/CoinCalculator'
import { CoinInfo } from '../components/CoinInfo'

import '../styles/pages.scss'

export const Crypt: FC = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const { history, current } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState<TChart | null>(null)
  const [cost, setCost] = useState<number>(Number(current?.priceUsd))

  useEffect(() => {
    getHistory(dispatch, id)
    getAsset(dispatch, id)

    return () => unsetAsset(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${id}`)

    pricesWs.onmessage = function (msg: MessageEvent<string>) {
      const data = JSON.parse(msg.data)[id]
      if (data) {
        setCost(Number(data))
      }
    }
    return () => pricesWs.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCost(Number(current?.priceUsd))
  }, [current])

  useEffect(() => {
    if (history) {
      const data = (history as TAssetHistory[]).map((val) => ({
        x: new Date(val.time).toLocaleDateString(),
        y: Number(Number(val.priceUsd).toFixed(2)),
      }))

      setChartData({ id, data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  if (!chartData || !current || !history) {
    return (
      <div className="content">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="crypt">
      <div className="crypt__wrapper">
        <CoinInfo current={current} cost={Number(Number(cost).toFixed(2))} />
        <div className="crypt__calculator">
          <CoinCalculator id={id} />
        </div>
      </div>
      <Chart data={[chartData]} />
    </div>
  )
}
