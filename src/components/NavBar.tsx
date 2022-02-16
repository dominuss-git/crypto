import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Logo } from '../assets/Logo'
import { Portfolio } from '../assets/Portfolio'
import { getAssets } from '../redux/actions/assetsActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { Statistic } from './Statistic'
import './styles.scss'

export const NavBar: FC = () => {
  const dispatch = useDispatch()
  const { top3 } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)

  useEffect(() => {
    getAssets(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar__logo_wrapper">
        <Logo />
        <h1 className="navbar__title">Crypto App</h1>
      </div>
      <Statistic top3={top3} />
      <Portfolio />
    </nav>
  )
}
