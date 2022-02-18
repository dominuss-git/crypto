import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TAsset, TPortfolio } from '../redux/types'
import { AddButton } from './Buttons'
import { CoinCalculator } from './CoinCalculator'
import { Modal } from './Modal'

import './styles.scss'

export const Cell: FC<{ asset: TAsset, setVisible: (state: string | null) => void }> = ({ setVisible, asset: { rank, id, vwap24Hr, priceUsd, symbol, changePercent24Hr } }) => {
  const navigate = useNavigate()
  const portfolio = localStorage.getItem(id)
  let data = 0

  if (portfolio) {
    data = JSON.parse(portfolio).reduce((acc: number, val: TPortfolio) => {
      acc += Number(val.valueUSD)

      return acc
    }, 0)
  }

  return (
    <tr className="table__body_row">
      <td onClick={() => navigate(`/crypto/${id}`)} className="table__body_column">
        {rank}
      </td>
      <td onClick={() => navigate(`/crypto/${id}`)} className="table__body_column">
        <div className="table__body_coin">
          <img
            className="table__img"
            src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
            alt=""
          />
          {symbol}
        </div>
      </td>
      <td onClick={() => navigate(`/crypto/${id}`)} className="table__body_column table__hide_800">
        {Number(vwap24Hr).toFixed(2)} $
      </td>
      <td onClick={() => navigate(`/crypto/${id}`)} className="table__body_column">
        {Number(priceUsd).toFixed(2)} $
      </td>
      <td
        onClick={() => navigate(`/crypto/${id}`)}
        className={'table__body_column' + (Number(changePercent24Hr) < 0 ? ' table__down' : ' table__up')}
      >
        {Number(changePercent24Hr) > 0 ? `+${Number(changePercent24Hr).toFixed(2)}` : Number(changePercent24Hr).toFixed(2)} %
      </td>
      <td className="table__body_column">
        <AddButton onClick={() => setVisible(id)} />
      </td>
      <td onClick={() => navigate(`/crypto/${id}`)} className="table__body_column table__hide_600">
        <span>{data.toFixed(2)}</span> $
      </td>
    </tr>
  )
}
