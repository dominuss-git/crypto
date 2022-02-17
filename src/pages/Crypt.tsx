import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { getHistory } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { TAssetHistory } from '../redux/types'
import { Chart, TChart } from '../components/Chart'
import { Modal } from '../components/Modal'
import { Spinner } from '../components/Spinner'
import { CoinCalculator } from '../components/CoinCalculator'

import '../styles/pages.scss'
import { SnackBar } from '../components/SnackBar'

export const Crypt: FC = () => {
  const { history } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState<TChart | null>(null)
  const [isVisible, setVisible] = useState<boolean>(false)

  const location = useLocation()

  useEffect(() => {
    getHistory(dispatch, location.pathname.split('/')[2])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (history) {
      const data = (history as TAssetHistory[]).map((val) => ({
        x: new Date(val.time).toLocaleDateString(),
        y: Number(Number(val.priceUsd).toFixed(2)),
      }))

      const id = location.pathname.split('/')[2]

      setChartData({ id, data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  if (!chartData) {
    return (
      <div className="content">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="content">
      {isVisible && (
        <Modal
          title="Add coin"
          onClose={() => {
            setVisible(false)
          }}
        >
          <CoinCalculator setVisible={setVisible} id={chartData.id} />
          <SnackBar />
        </Modal>
      )}
      <h2>{location.pathname.split('/')[2]}</h2>
      <Chart
        data={[chartData]}
        onClick={() => {
          setVisible(true)
        }}
      />
    </div>
  )
}
