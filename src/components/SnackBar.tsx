import React, { Dispatch, FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { hideSnack, showSnack as show } from '../redux/actions/snackActions'
import { TReducers } from '../redux/reducers'
import { TSnack } from '../redux/reducers/snackReducer'

import './styles.scss'

export const showSnack = (dispatch: Dispatch<any>, title: string, content: ReactNode) => {
  show(dispatch, { title, content, visible: true })
  setTimeout(() => hideSnack(dispatch), 3000)
}

export const SnackBar: FC = () => {
  const { visible, content, title } = useSelector<TReducers, TSnack>((state) => state.snack)

  return visible ? (
    <div className="snackbar">
      <div className="snackbar__title">{title}</div>
      <div className="snackbar__content">{content}</div>
    </div>
  ) : null
}
