import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Triangle } from '../assets/Triangle'
import { sortAssets, SortFields } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { Cell } from './Cell'

import './styles.scss'

export const Table: FC = () => {
  const { assets } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const [sortBy, setSort] = useState<{ field: SortFields; down: boolean }>({ field: SortFields.rank, down: false })
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)

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
            <th onClick={() => sort(SortFields.rank)} className="table__head_column">
              <Triangle down={sortBy.field === SortFields.rank && sortBy.down}>
                <span className="table__hide">Rank</span>
              </Triangle>
            </th>
            <th onClick={() => sort(SortFields.coin)} className="table__head_column">
              <Triangle down={sortBy.field === SortFields.coin && sortBy.down}>
                <span>Coin</span>
              </Triangle>
            </th>
            <th onClick={() => sort(SortFields.price)} className="table__head_column">
              <Triangle down={sortBy.field === SortFields.price && sortBy.down}>
                <span>Price</span>
              </Triangle>
            </th>
            <th onClick={() => sort(SortFields.change)} className="table__head_column">
              <Triangle down={sortBy.field === SortFields.change && sortBy.down}>
                <span className="table__hide">Change (24Hr)</span>
              </Triangle>
            </th>
            <th className="table__head_column">
              <span className="table__hide">Add</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.slice(0 + 10 * (page - 1), 10 * page).map((val) => (
            <Cell key={val.symbol} asset={val} />
          ))}
        </tbody>
      </table>
      <div className="table__pagination">
        <span onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)} className="table__page-index">
          {'<'}
        </span>
        {page - 1 > 0 && (
          <span className="table__page-index" onClick={() => setPage(page - 1)}>
            {page - 1}
          </span>
        )}
        <span className="table__page-index table__page-index_active">{page}</span>
        {page + 1 <= assets.length / 10 && (
          <span className="table__page-index" onClick={() => setPage(page + 1)}>
            {page + 1}
          </span>
        )}
        <span onClick={() => setPage(page + 1 > assets.length / 10 ? 10 : page + 1)} className="table__page-index">
          {'>'}
        </span>
      </div>
    </div>
  )
}
