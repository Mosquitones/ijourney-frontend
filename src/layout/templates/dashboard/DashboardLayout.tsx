import React from 'react'

import { Outlet } from 'react-router-dom'

import { LayoutMainStyles, LayoutStyles } from './DashboardLayout.styles'

export const DashboardLayout: React.FC = () => {
  return (
    <LayoutStyles>
      {/* <SkipLinkComponent /> */}
      <LayoutMainStyles>
        <Outlet />
      </LayoutMainStyles>
    </LayoutStyles>
  )
}
