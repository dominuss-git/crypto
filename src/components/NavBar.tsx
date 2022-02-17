import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Logo } from '../assets/Logo'
import { Portfolio } from '../assets/Portfolio'
import { useUpdateAssets } from '../hooks/useUpdateAssets'
import { setPortfolio } from '../redux/actions/portfolioActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { TPortfolioProps } from '../redux/reducers/portfolioReducer'
import { Modal } from './Modal'
import { PortfolioBody } from './PortfolioBody'
import { Statistic } from './Statistic'

import './styles.scss'

export const NavBar: FC = () => {
  const dispatch = useDispatch()
  const { assets, top3 } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const { cost, raised } = useSelector<TReducers, TPortfolioProps>(({ portfolio }) => portfolio)
  const [isVisible, setVisible] = useState<boolean>(false)

  useUpdateAssets()

  useEffect(() => {
    setPortfolio(dispatch, assets)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav className="navbar">
      <NavLink to="/crypto/" className="navbar__logo-wrapper">
        <Logo />
        <h1 className="navbar__title">Crypto App</h1>
      </NavLink>
      <Statistic top3={top3} />
      <Portfolio onClick={() => setVisible(true)} raised={raised} cost={cost} />
      {isVisible && (
        <Modal title="Porfolio" onClose={() => setVisible(false)}>
          <PortfolioBody />
        </Modal>
      )}
    </nav>
  )
}
