import { FC } from 'react'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { SnackBar } from '../components/SnackBar'
import '../styles/pages.scss'

export const PublicLayout: FC = ({ children }) => (
  <div className="public-layout">
    <NavBar />
    {children}
    <SnackBar />
    <Footer />
  </div>
)
