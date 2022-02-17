import React, { FC, useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Logo } from '../assets/Logo'
import { Portfolio } from '../assets/Portfolio'
import { useUpdateAssets } from '../hooks/useUpdateAssets'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { Statistic } from './Statistic'
import './styles.scss'

type TPortfolio = {
  valueUSD: string
  valueCoins: string
  price: string
}

export const NavBar: FC = () => {
  const { assets, top3 } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const [raised, setRaised] = useState<number>(0)
  const [cost, setCost] = useState<number>(0)

  useUpdateAssets()

  useEffect(() => {
    let cost = 0
    let change = 0
    let raised

    for (let i = 0; true; i++) {
      const key = localStorage.key(i)

      if (!key) {
        break
      }

      const portfolio = JSON.parse(localStorage.getItem(key) as string)
      const coin = assets.find((val) => val.id === key)

      // eslint-disable-next-line no-loop-func
      portfolio.forEach((val: TPortfolio) => {
        cost += Number(val.valueUSD)
        if (coin) {
          change += Number(val.valueCoins) * Number(coin.priceUsd)
        }
      })
    }

    raised = (change / cost) * 100 - 100

    if (change < cost) {
      raised *= -1
    }

    setRaised(raised)
    setCost(cost)

    console.log(cost, change, raised)
  }, [assets])

  return (
    <nav className="navbar">
      <div className="navbar__logo_wrapper">
        <Logo />
        <h1 className="navbar__title">Crypto App</h1>
      </div>
      <Statistic top3={top3} />
      <Portfolio raised={raised} cost={cost} />
    </nav>
  )
}
