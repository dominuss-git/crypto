import { FC } from 'react'

import { TAsset } from '../redux/types'

import './styles.scss'

type TCoinInfo = {
  current: TAsset
  cost: number
}

export const CoinInfo: FC<TCoinInfo> = ({ current, cost }) => {
  const high = (Number(current?.priceUsd) / (100 + Number(current?.changePercent24Hr))) * 100

  return (
    <div className="coin-info">
      <div className="coin-info__logo">
        <img
          className="coin-info__img"
          src={`https://assets.coincap.io/assets/icons/${current.symbol.toLowerCase()}@2x.png`}
          alt=""
        />
        <div>
          <h2>{current?.name}</h2>
          <h3>{current.symbol}</h3>
        </div>
      </div>
      <div>
        <h2>Price: {cost}$</h2>
        <h2>Average: {Number(current.vwap24Hr).toFixed(2)}$</h2>
        <h2>
          Change:{' '}
          <span className={cost / high - 1 > 0 ? 'table__up' : 'table__down'}>
            {((cost / high - 1) * 100).toFixed(2)}%
          </span>
        </h2>
      </div>
    </div>
  )
}
