import { FC } from 'react'

import './styles.scss'

type TTogle = {
  onClick: (event: any) => void
}

export const Toggle: FC<TTogle> = ({ ...rest }) => {
  return (
    <label className="toggle">
      <input {...rest} className="toggle__checkbox" type="checkbox" />
      <span className="toggle__slider toggle__round"></span>
    </label>
  )
}
