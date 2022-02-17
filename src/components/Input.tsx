import React, { FC, InputHTMLAttributes } from 'react'

import './styles.scss'

export const Input: FC<InputHTMLAttributes<any>> = ({ title, ...rest }) => {
  return (
    <div className="input__wrapper">
      <label className="input__title">{title}</label>
      <input className="input" {...rest} />
    </div>
  )
}
