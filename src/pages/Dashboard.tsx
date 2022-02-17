import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from '../components/Spinner'
import { Table } from '../components/Table'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'

import '../styles/pages.scss'

export const Dashboard: FC = () => {
  const { assets } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)

  if (assets.length === 0) {
    return (
      <div className="content">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="content">
      <Table />
    </div>
  )
}
