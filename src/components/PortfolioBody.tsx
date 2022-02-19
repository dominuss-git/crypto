import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Triangle } from '../assets/Triangle'
import { Trash } from '../assets/Trash'
import { TReducers } from '../redux/reducers'
import { TAssetProps } from '../redux/reducers/assetsReducer'
import { setPortfolio, setSortedPortfolio } from '../redux/actions/portfolioActions'
import { TPortfolioProps } from '../redux/reducers/portfolioReducer'
import { TPortfolio } from '../redux/types'

import './styles.scss'
import { Modal } from './Modal'
import { Button } from './Buttons'
import { Toggle } from './Toggle'

export enum SortFields {
  name,
  coins,
  contributed,
  cost,
  profit,
}

export const PortfolioBody: FC = () => {
  const dispatch = useDispatch()
  const { portfolio } = useSelector<TReducers, TPortfolioProps>(({ portfolio }) => portfolio)
  const { assets } = useSelector<TReducers, TAssetProps>(({ assets }) => assets)
  const [sortBy, setSort] = useState<{ field: SortFields; down: boolean }>({ field: SortFields.name, down: false })
  const [isVisible, setVisible] = useState<string | null>(null)
  const [group, setGroup] = useState<boolean>(false)

  const sort = (field: SortFields) => {
    if (field === sortBy.field) {
      setSort({ ...sortBy, down: !sortBy.down })
      return
    }

    setSort({ field, down: true })
  }

  useEffect(() => {
    const { field, down } = sortBy

    if (!portfolio) return

    if (field === SortFields.name) {
      portfolio.sort((a, b) => {
        const keyA = Object.keys(a)[0]
        const keyB = Object.keys(b)[0]
        const coinA = assets.find((val) => val.id === keyA)
        const coinB = assets.find((val) => val.id === keyB)

        if (!coinA || !coinB) {
          return 0
        }

        if (coinA?.symbol >= coinB?.symbol) {
          return down ? 1 : -1
        } else {
          return down ? -1 : 1
        }
      })
    }
    if (field === SortFields.coins) {
      portfolio.sort((a, b) => {
        const keyA = Object.keys(a)[0]
        const keyB = Object.keys(b)[0]
        const coinsA = a[keyA].valueCoins /*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueCoins)
          return acc
        }, 0) */
        const coinsB = b[keyB].valueCoins /*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueCoins)
          return acc
        }, 0) */


        if (coinsA >= coinsB) {
          return down ? -1 : 1
        } else {
          return down ? 1 : -1
        }
      })
    }
    if (field === SortFields.contributed) {
      portfolio.sort((a, b) => {
        const keyA = Object.keys(a)[0]
        const keyB = Object.keys(b)[0]
        const contributedA = a[keyA].valueUSD /*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueUSD)
          return acc
        }, 0) */
        const contributedB = b[keyB].valueUSD /*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueUSD)
          return acc
        }, 0) */
        if (contributedA >= contributedB) {
          return down ? 1 : -1
        } else {
          return down ? -1 : 1
        }
      })
    }
    if (field === SortFields.cost) {
      portfolio.sort((a, b) => {
        const keyA = Object.keys(a)[0]
        const keyB = Object.keys(b)[0]
        const coinA = assets.find((val) => val.id === keyA)
        const coinB = assets.find((val) => val.id === keyB)

        if (!coinA || !coinB) {
          return 0
        }

        const coinsA = a[keyA].valueCoins/*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueCoins)
          return acc
        }, 0) */
        const coinsB = b[keyB].valueCoins/*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueCoins)
          return acc
        }, 0) */

        const costA = coinsA * Number(coinA?.priceUsd)
        const costB = coinsB * Number(coinB?.priceUsd)

        if (costA >= costB) {
          return down ? 1 : -1
        } else {
          return down ? -1 : 1
        }
      })
    }
    if (field === SortFields.profit) {
      portfolio.sort((a, b) => {
        const keyA = Object.keys(a)[0]
        const keyB = Object.keys(b)[0]
        const coinA = assets.find((val) => val.id === keyA)
        const coinB = assets.find((val) => val.id === keyB)

        if (!coinA || !coinB) {
          return 0
        }

        const coinsA = a[keyA].valueCoins/*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueCoins)
          return acc
        }, 0) */
        const coinsB = b[keyB].valueCoins/*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueCoins)
          return acc
        }, 0) */
        const contributedA = a[keyA].valueUSD /*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueUSD)
          return acc
        }, 0) */
        const contributedB = b[keyB].valueUSD /*.reduce((acc: number, coin: TPortfolio) => {
          acc += Number(coin.valueUSD)
          return acc
        }, 0) */

        const costA = coinsA * Number(coinA?.priceUsd)
        const costB = coinsB * Number(coinB?.priceUsd)

        const profitA = (costA / contributedA) * 100 - 100
        const profitB = (costB / contributedB) * 100 - 100

        if (profitA >= profitB) {
          return down ? 1 : -1
        } else {
          return down ? -1 : 1
        }
      })
    }

    setSortedPortfolio(dispatch, portfolio)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, assets])

  if (portfolio.length === 0) {
    return <h2 style={{ color: '#fff' }}>You don't have any coins</h2>
  }

  return (
    <>
      <table className="table">
        <thead className="table__head">
          <tr className="table__head_row">
            <th className="table__head_column table__clickable" onClick={() => sort(SortFields.name)}>
              <Triangle down={sortBy.field === SortFields.name && sortBy.down}>
                <span>Name</span>
              </Triangle>
            </th>
            <th className="table__head_column table__clickable" onClick={() => sort(SortFields.coins)}>
              <Triangle down={sortBy.field === SortFields.coins && sortBy.down}>
                <span>Coins</span>
              </Triangle>
            </th>
            <th
              className="table__head_column table__hide_500 table__clickable"
              onClick={() => sort(SortFields.contributed)}
            >
              <Triangle down={sortBy.field === SortFields.contributed && sortBy.down}>
                <span>Contributed</span>
              </Triangle>
            </th>
            <th className="table__head_column table__hide_400 table__clickable" onClick={() => sort(SortFields.cost)}>
              <Triangle down={sortBy.field === SortFields.cost && sortBy.down}>
                <span>Cost</span>
              </Triangle>
            </th>
            <th className="table__head_column table__clickable" onClick={() => sort(SortFields.profit)}>
              <Triangle down={sortBy.field === SortFields.profit && sortBy.down}>
                <span className="table__hide_500">Profit</span>
              </Triangle>
            </th>
            <th className="table__head_column" onClick={() => sort(SortFields.profit)}>
              <span>&times;</span>
            </th>
          </tr>
        </thead>
        <tbody className="table__body">
          {portfolio.map((val, i) => {
            const key = Object.keys(val)[0]
            const coin = assets.find((val) => val.id === key)
            const coins = val[key].valueCoins/*  val[key].reduce((acc: number, coin: TPortfolio) => {
              acc += Number(coin.valueCoins)

              return acc
            }, 0) */
            const contributed = val[key].valueUSD/* val[key].reduce((acc: number, coin: TPortfolio) => {
              acc += Number(coin.valueUSD)

              return acc
            }, 0)*/
            const cost = coins * Number(coin?.priceUsd)
            const profit = (cost / contributed) * 100 - 100

            return (
              <tr key={i} className="table__body_row-modal">
                <td className="table__body_column">
                  <div className="table__body_coin">
                    <img
                      className="table__img"
                      src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
                      alt=""
                    />
                    {coin?.symbol}
                  </div>
                </td>
                <td className="table__body_column">{coins.toFixed(2)}</td>
                <td className="table__body_column table__hide_500">{contributed.toFixed(2)}$</td>
                <td className="table__body_column table__hide_400">{cost.toFixed(2)}$</td>
                <td className={'table__body_column' + (Number(profit) < 0 ? ' table__down' : ' table__up')}>
                  {profit > 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2)} %
                </td>
                <td>
                  <Trash
                    onClick={() => {
                      setVisible(key)
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isVisible !== null && (
        <Modal onClose={() => setVisible(null)} title="Delete this transaction">
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button
              light
              onClick={() => {
                localStorage.removeItem(isVisible)
                setPortfolio(dispatch, assets)
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setVisible(null)} secondary>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
