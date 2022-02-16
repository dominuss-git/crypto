import React, { FC } from 'react'

export const Triangle: FC<{ down: boolean }> = ({ children, down }) => (
  <div className="triangle">
    <span className="triangle__title">{children}</span>
    <svg className={down ? 'triangle__down' : ''} width="11" height="11">
      <polygon points="5,5 6,4 7,5" fill="#E5E5E5" stroke="#E5E5E5" strokeWidth="3" />
    </svg>
  </div>
)
