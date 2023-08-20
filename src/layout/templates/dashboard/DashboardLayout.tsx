import React from 'react'

import { Outlet } from 'react-router-dom'

import { Header } from './components'
import * as S from './DashboardLayout.styles'

export const DashboardLayout: React.FC = () => {
  return (
    <S.Layout>
      {/* <SkipLinkComponent /> */}
      <Header />
      <S.Main>
        <Outlet />
      </S.Main>
    </S.Layout>
  )
}

export * from './components'
