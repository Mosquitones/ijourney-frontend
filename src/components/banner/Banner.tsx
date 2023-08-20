import React, { PropsWithChildren } from 'react'

import { Container } from '@mui/material'

import * as S from './Banner.styles'

export const Banner: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.Banner>
      <Container>{children}</Container>
    </S.Banner>
  )
}
