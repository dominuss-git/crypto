import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/pages.scss'

export const Crypt: FC = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div className="content">
      <h2>{location.pathname}</h2>
    </div>
  )
}
