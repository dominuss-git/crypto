import React, { FC } from 'react'

import './styles.scss'

type TTrash = {
  onClick?: () => void
}

export const Trash: FC<TTrash> = ({ ...rest }) => (
  <div {...rest}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <g fill="#C8102E">
        <path d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H4z" />
      </g>
    </svg>
  </div>
)