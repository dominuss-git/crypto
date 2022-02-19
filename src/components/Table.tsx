import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Triangle } from '../assets/Triangle'
import { sortAssets, SortFields } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { Cell } from './Cell'
import { CoinCalculator } from './CoinCalculator'
import { Modal } from './Modal'

import './styles.scss'

export const Table: FC = () => {
  const { assets } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const [sortBy, setSort] = useState<{ field: SortFields; down: boolean }>({ field: SortFields.rank, down: false })
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [isVisible, setVisible] = useState<string | null>(null)

  const sort = (field: SortFields) => {
    if (field === sortBy.field) {
      setSort({ ...sortBy, down: !sortBy.down })
      return
    }

    setSort({ field, down: true })
  }

  useEffect(() => {
    sortAssets(dispatch, sortBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  return (
    <div className="table__wrapper">
      <table className="table">
        <thead className="table__head">
          <tr className="table__head_row">
            <th onClick={() => sort(SortFields.rank)} className="table__head_column table__clickable">
              <Triangle down={sortBy.field === SortFields.rank && sortBy.down}>
                <span className="table__hide_500">Rank</span>
              </Triangle>
            </th>
            <th onClick={() => sort(SortFields.coin)} className="table__head_column table__clickable">
              <Triangle down={sortBy.field === SortFields.coin && sortBy.down}>
                <span>Coin</span>
              </Triangle>
            </th>
            <th onClick={() => sort(SortFields.vwap)} className="table__head_column table__hide_800 table__clickable">
              <Triangle down={sortBy.field === SortFields.vwap && sortBy.down}>
                <span>VWAP (24Hr)</span>
              </Triangle>
            </th>
            <th onClick={() => sort(SortFields.price)} className="table__head_column table__clickable">
              <Triangle down={sortBy.field === SortFields.price && sortBy.down}>
                <span>Price</span>
              </Triangle>
            </th>
            <th onClick={() => sort(SortFields.change)} className="table__head_column table__clickable">
              <Triangle down={sortBy.field === SortFields.change && sortBy.down}>
                <span className="table__hide_500">Change (24Hr)</span>
              </Triangle>
            </th>
            <th className="table__head_column">
              <span className="table__hide_500">Add</span>
            </th>
            <th className="table__head_column table__hide_600">
              <span>Portfolio</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.slice(0 + 15 * (page - 1), 15 * page).map((val) => (
            <Cell key={val.symbol} asset={val} setVisible={setVisible} />
          ))}
        </tbody>
      </table>
      {isVisible && (
        <Modal
          title="Add coin"
          onClose={() => {
            setVisible(null)
          }}
        >
          <CoinCalculator setVisible={setVisible} id={isVisible as string} />
        </Modal>
      )}
      <div className="table__pagination">
        <span onClick={() => setPage(page - 1 < 1 ? page : page - 1)} className="table__page-index">
          {'<'}
        </span>
        {page !== 1 && page !== 2 && (
          <>
            <span className="table__page-index" onClick={() => setPage(1)}>
              1
            </span>
            <span style={{ color: '#115740', fontSize: '25px' }}>
            ...
            </span>
          </>
        )}
        {page - 1 > 0 && (
          <span className="table__page-index" onClick={() => setPage(page - 1)}>
            {page - 1}
          </span>
        )}
        <span className="table__page-index table__page-index_active">{page}</span>
        {page + 1 <= assets.length / 15 + 0.9 && (
          <span className="table__page-index" onClick={() => setPage(page + 1)}>
            {page + 1}
          </span>
        )}
        {page !== Number((assets.length / 15).toFixed()) && page !== Number((assets.length / 15).toFixed()) - 1 && (
          <>
            <span className='table__spread'>
            ...
            </span>
            <span className="table__page-index" onClick={() => setPage(Number((assets.length / 15).toFixed()))}>
              {(assets.length / 15).toFixed()}
            </span>
          </>
        )}
        <span
          onClick={() => setPage(page + 1 > assets.length / 15 + 0.9 ? page : page + 1)}
          className="table__page-index"
        >
          {'>'}
        </span>
      </div>
    </div>
  )
}
