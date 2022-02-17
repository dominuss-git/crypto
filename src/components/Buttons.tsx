import React, { ButtonHTMLAttributes, FC } from 'react'

import './styles.scss'

export type TButtonProps = {
  onClick?: () => void
}

export const Button: FC<TButtonProps & ButtonHTMLAttributes<any>> = ({ children, ...rest }) => {
  return (
    <button className="button" {...rest}>
      {children}
    </button>
  )
}

export const AddButton: FC<TButtonProps> = ({ ...rest }) => {
  return (
    <button className="add-button" {...rest}>
      +
    </button>
  )
}