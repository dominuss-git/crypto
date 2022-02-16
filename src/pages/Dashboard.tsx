import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Triangle } from '../assets/Triangle'
import { Button } from '../components/Buttons'
import { showSnack, SnackBar } from '../components/SnackBar'
import { Spinner } from '../components/Spinner'
import { Table } from '../components/Table'
import { getHistory } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import '../styles/pages.scss'

export const Dashboard: FC = () => {
  const dispatch = useDispatch()
  const { assets, history } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)

  // useEffect(() => {
  //   getAssets(dispatch);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const func = () => {
  //   showSnack(dispatch, 'hi', 'hi')
  // }

  if (assets.length === 0) {
    return (
      <div className="content">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="content">
      {/* <Spinner /> */}
      {/* <Button onClick={func}>click me</Button> */}

      {/* <SnackBar /> */}
      <Table />
      {/* <Modal title="ghbdtn">
        <Spinner />
      </Modal> */}
    </div>
  )
}
