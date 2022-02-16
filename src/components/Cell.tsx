import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { TAsset } from '../redux/types'
import { AddButton } from './Buttons'

import './styles.scss'

export const Cell: FC<{ asset: TAsset }> = ({ asset: { rank, id, priceUsd, symbol, changePercent24Hr } }) => {
  const navigate = useNavigate();
  
  return (
    <tr className="table__body_row">
      <td onClick={() => navigate(`/${id}`)}  className="table__body_column">{rank}</td>
      <td onClick={() => navigate(`/${id}`)}  className="table__body_column">
        <div className='table__body_coin'>
          <img
            className='table__img'
            src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
            alt=""
          />
          {symbol}
        </div>
      </td>
      <td onClick={() => navigate(`/${id}`)}  className="table__body_column">{Number(priceUsd).toFixed(2)} $</td>
      <td onClick={() => navigate(`/${id}`)}  className={'table__body_column' + (Number(changePercent24Hr) < 0 ? ' table__down' : ' table__up')}>
        {Number(changePercent24Hr).toFixed(2)} %
      </td>
      <td className="table__body_column">
        <AddButton onClick={console.log}/>
      </td>
    </tr>
  )
}
