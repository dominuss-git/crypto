import React, { ButtonHTMLAttributes, FC } from 'react'

import './styles.scss'

export type TButtonProps = {
  onClick?: () => void
  light?: boolean
}

export const Button: FC<TButtonProps & ButtonHTMLAttributes<any>> = (
  { children, light, ...rest } = { light: false }
) => {
  return (
    <button className={light ? 'button__light' : 'button'} {...rest}>
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
