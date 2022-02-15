import React, { FC, ReactNode } from 'react'
import './styles.scss'

type ModalViewProps = {
  children?: ReactNode
  title?: string
}

export const Modal: FC<ModalViewProps> = ({ children, title, ...rest }) => {
  return (
    <div className="modal__overlay">
      <div className="modal__container">
        {title ? <div className="modal__title">{title}</div> : null}
        {children ? <div className="modal__content">{children}</div> : null}
      </div>
    </div>
  )
}
