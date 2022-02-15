import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '../components/Buttons'
import { showSnack, SnackBar } from '../components/SnackBar'
import { Spinner } from '../components/Spinner'
import '../styles/pages.scss'

export const Dashboard: FC = () => {
  const dispatch = useDispatch()
  // const assets = useSelector<TReducers>(({ assets }) => assets.assets)

  // useEffect(() => {
  //   getAssets(dispatch);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const func = () => {
    showSnack(dispatch, 'hi', 'hi')
  }

  // useEffect(() => {
  // console.log(assets);
  // }, [assets]);

  return (
    <div className="content">
      <Spinner />
      <Button onClick={func}>click me</Button>

      <SnackBar />
      {/* <Modal title="ghbdtn">
        <Spinner />
      </Modal> */}
    </div>
  )
}
