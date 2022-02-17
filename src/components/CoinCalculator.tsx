import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setPortfolio } from '../redux/actions/portfolioActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { request } from '../redux/request'
import { TAsset } from '../redux/types'
import { Button } from './Buttons'
import { Input } from './Input'
import { showSnack } from './SnackBar'
import { Spinner } from './Spinner'

import './styles.scss'

type TCoinCalculatorProps = {
  id: string
  setVisible: (state: boolean) => void
}

export type TForm = {
  coin: string
  value: string
}

export const CoinCalculator: FC<TCoinCalculatorProps> = ({ id, setVisible }) => {
  const dispatch = useDispatch()
  const [coin, setCoin] = useState<TAsset | null>(null)
  const [form, setForm] = useState<TForm>({ coin: '', value: '' })
  const { assets } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    if (event.target.name === 'value') {
      setForm({ value: event.target.value, coin: (Number(event.target.value) / Number(coin?.priceUsd)).toString() })
    }
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const portfolio = localStorage.getItem(id)

    console.log(form.value)

    if (portfolio) {
      const data = JSON.parse(portfolio)
      data.push({ valueUSD: form.value, valueCoins: form.coin, price: coin?.priceUsd })
      localStorage.setItem(id, JSON.stringify(data))
    } else {
      localStorage.setItem(id, JSON.stringify([{ valueUSD: form.value, valueCoins: form.coin, price: coin?.priceUsd }]))
    }

    setPortfolio(dispatch, assets);
    showSnack(dispatch, 'Added', `${id} to your portfolio`)
    setVisible(false)
  }

  const getCoin = () => {
    request<TAsset>(`https://api.coincap.io/v2/assets/${id}`, 'GET').then((asset) => {
      if (asset.status === 200) {
        setCoin(asset.body.data)
      }
    })
    .catch(e => {
      showSnack(dispatch, 'Error', <Button onClick={getCoin}>Reload</Button>)
    })
  }

  useEffect(() => {
    getCoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!coin) {
    return <Spinner />
  }

  return (
    <div className="coin-calculator">
      <form onSubmit={onSubmit}>
        <Input
          title={`Price ~ ${Number(coin.priceUsd).toFixed(2)}`}
          onChange={onChange}
          type="number"
          name="value"
          min={0}
          max={100000}
          step="0.01"
        />
        <Input onChange={onChange} value={form.coin} type="number" name="coin" disabled />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
