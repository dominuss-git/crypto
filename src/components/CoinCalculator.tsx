import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAssets } from '../redux/actions/assetsActions'
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

type TForm = {
  coin: string
  value: string
}

export const CoinCalculator: FC<TCoinCalculatorProps> = ({ id, setVisible }) => {
  const dispatch = useDispatch()
  const [coin, setCoin] = useState<TAsset | null>(null)
  const [form, setForm] = useState<TForm>({ coin: '', value: '' })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'value') {
      setForm({ value: event.target.value, coin: (Number(event.target.value) / Number(coin?.priceUsd)).toString() })
    }
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const portfolio = localStorage.getItem(id)

    if (portfolio) {
      const data = JSON.parse(portfolio)
      data.push({ valueUSD: form.value, valueCoins: form.coin, price: coin?.priceUsd })
      localStorage.setItem(id, JSON.stringify(data))
    } else {
      localStorage.setItem(id, JSON.stringify([{ valueUSD: form.value, valueCoins: form.coin, price: coin?.priceUsd }]))
    }

    getAssets(dispatch)
    showSnack(dispatch, 'Information Updated', '')
    setVisible(false)
  }

  const getCoin = () => {
    request<TAsset>(`https://api.coincap.io/v2/assets/${id}`, 'GET').then((asset) => {
      console.log(asset)
      if (asset.status === 200) {
        setCoin(asset.body.data)
      }
    })
    // .catch(e => {
    //   showSnack(dispatch, 'Error', <Button onClick={getCoin}>Reload</Button>)
    // })
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
        />
        <Input onChange={onChange} value={form.coin} type="number" name="coin" disabled />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
