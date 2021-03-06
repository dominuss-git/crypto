import React, { FC } from 'react'

import { Routes as ReactRoutes, Route, BrowserRouter } from 'react-router-dom'
import { Crypt } from './pages/Crypt'
import { Dashboard } from './pages/Dashboard'
import { PublicLayout } from './pages/PublicLayout'

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          path="/crypto/"
          element={
            <PublicLayout>
              <Dashboard />
            </PublicLayout>
          }
        />
        <Route
          path="/crypto/:id"
          element={
            <PublicLayout>
              <Crypt />
            </PublicLayout>
          }
        />
      </ReactRoutes>
    </BrowserRouter>
  )
}
