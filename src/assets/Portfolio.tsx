import React, { FC } from 'react'

import './styles.scss'

type TPortfolioProps = {
  cost: number
  raised: number
}

export const Portfolio: FC<TPortfolioProps> = ({ cost, raised }) => (
  <div className="portfolio">
    <svg fill="none" height="50" viewBox="0 0 28 26" width="50" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.3 25H4.70001C2.80001 25 1.20001 23.4 1.20001 21.5V9.29999C1.20001 7.39999 2.80001 5.79999 4.70001 5.79999H23.3C25.2 5.79999 26.8 7.39999 26.8 9.29999V21.5C26.8 23.4 25.2 25 23.3 25Z"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M20.4 5.79999H7.60001V3C7.60001 1.9 8.50001 1 9.60001 1H18.4C19.5 1 20.4 1.9 20.4 3V5.79999Z"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path d="M2 13.8H26.8" stroke="#fff" strokeMiterlimit="10" strokeWidth="2" />
      <path d="M6.79999 12.2V16.2" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
      <path d="M21.2 12.2V16.2" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
    </svg>
    <span className="portfolio__cost">
      {cost} $
      <span className={'portfolio__raised' + (raised < 0 ? ' portfolio__down' : ' portfolio__up')}>
        {raised > 0 ? '+' + raised.toFixed(2) : raised.toFixed(2)}%
      </span>
    </span>
  </div>
)
