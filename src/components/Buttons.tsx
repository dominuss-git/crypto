import React, { FC } from 'react'
import './styles.scss'

export type TButtonProps = {
  onClick?: () => void
}

export const Button: FC<TButtonProps> = ({ children, ...rest }) => {
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