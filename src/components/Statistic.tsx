import React, { FC } from 'react'

import { Coin } from '../redux/types'

import './styles.scss'

type TStatisticProps = {
  top3: Coin[]
}

export const Statistic: FC<TStatisticProps> = ({ top3 }) => {
  return (
    <div className="statistic">
      {top3.map((val) => (
        <span className="statistic__coin" key={val.name}>
          {val.name}: {val.price}$
        </span>
      ))}
    </div>
  )
}
