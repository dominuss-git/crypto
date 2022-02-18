import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAsset, unsetAsset } from '../redux/actions/assetsActions'

import { setPortfolio } from '../redux/actions/portfolioActions'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { Button } from './Buttons'
import { Input } from './Input'
import { showSnack } from './SnackBar'
import { Spinner } from './Spinner'
import { Toggle } from './Toggle'

import './styles.scss'

type TCoinCalculatorProps = {
  id: string
  setVisible?: (state: string | null) => void
}

export type TForm = {
  coin: string
  value: string
  valute: boolean
}

export const CoinCalculator: FC<TCoinCalculatorProps> = ({ id, setVisible }) => {
  const dispatch = useDispatch()
  // const [coin, setCoin] = useState<TAsset | null>(null)
  const [form, setForm] = useState<TForm>({ coin: '0', value: '', valute: false })
  const { assets, current: coin } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!form.valute) {
      setForm({
        ...form,
        value: event.target.value,
        coin: (Number(event.target.value) / Number(coin?.priceUsd)).toString(),
      })
      return
    }

    setForm({
      ...form,
      value: event.target.value,
      coin: (Number(event.target.value) * Number(coin?.priceUsd)).toString(),
    })
  }

  const onToggleClick = (event: any) => {
    console.log(event.target.checked)

    if (event.target.checked) {
      setForm({ ...form, coin: (Number(form.value) * Number(coin?.priceUsd)).toString(), valute: event.target.checked })
      return
    }

    setForm({ ...form, coin: (Number(form.value) / Number(coin?.priceUsd)).toString(), valute: event.target.checked })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const newCoin = {
      valueUSD: 0,
      price: 0,
      valueCoins: 0,
    }

    if (form.valute) {
      newCoin.valueUSD = Number(form.coin)
      newCoin.price = Number(coin?.priceUsd)
      newCoin.valueCoins = Number(form.value)
    } else {
      newCoin.valueUSD = Number(form.value)
      newCoin.price = Number(coin?.priceUsd)
      newCoin.valueCoins = Number(form.coin)
    }

    const portfolio = localStorage.getItem(id)

    if (portfolio) {
      const data = JSON.parse(portfolio)
      data.push(newCoin)
      localStorage.setItem(id, JSON.stringify(data))
    } else {
      localStorage.setItem(id, JSON.stringify([newCoin]))
    }

    setPortfolio(dispatch, assets)
    showSnack(dispatch, 'Added', `${id} to your portfolio`)
    if (setVisible) {
      setVisible(null)
    }
  }

  // const getCoin = () => {
  // request<TAsset>(`https://api.coincap.io/v2/assets/${id}`, 'GET')
  // .then((asset) => {
  // if (asset.status === 200) {
  // setCoin(asset.body.data)
  // if (set) {
  // set(asset.body.data)
  // }
  // }
  // })
  // .catch((e) => {
  // showSnack(dispatch, 'Error', <Button onClick={getCoin}>Reload</Button>)
  // })
  // }

  useEffect(() => {
    if (!coin) {
      getAsset(dispatch, id)

      return () => unsetAsset(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!coin) {
    return <Spinner />
  }

  return (
    <div className="coin-calculator">
      <form onSubmit={onSubmit}>
        <Input
          title={`Price ~ ${Number(coin.priceUsd).toFixed(2)}$`}
          onChange={onChange}
          type="number"
          name="value"
          min={0}
          max={100000}
          step="0.01"
        />
        <Input
          title={form.valute ? 'USD' : coin.symbol}
          onChange={onChange}
          value={form.coin}
          type="number"
          name="coin"
          disabled
        />
        <div className="coin-calculator__button-wrapper">
          <Button type="submit" light>
            Submit
          </Button>
          <div className="coin-calculator__toggle">
            USD <Toggle onClick={onToggleClick} /> {coin.symbol}
          </div>
        </div>
      </form>
    </div>
  )
}
