export type TAsset = {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
}

export type TAssetHistory = {
  priceUsd: string
  time: number
}

export type TResponse<T = any> = {
  body: {
    data: T
    timestamp: number
  }
  status: number
}

export type Coin = {
  name: string
  rank: string
  price: string
}

export type TPortfolio = {
  valueUSD: number
  valueCoins: number
  price: number
}