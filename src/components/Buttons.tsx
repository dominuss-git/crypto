import React, { FC } from 'react'
import './styles.scss'

type TButtonProps = {
  onClick: () => void
}

export const Button: FC<TButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  )
}
