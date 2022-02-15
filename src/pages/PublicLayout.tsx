import { FC } from 'react'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import '../styles/pages.scss'

export const PublicLayout: FC = ({ children }) => (
  <div className="public-layout">
    <NavBar />
    {children}
    <Footer />
  </div>
)
