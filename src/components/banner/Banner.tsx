/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren } from 'react'

import { BoxProps, Container, Typography, TypographyProps } from '@mui/material'

import * as S from './Banner.styles'

const Wrapper: React.FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  return <S.Wrapper {...rest}>{children}</S.Wrapper>
}

const BannerContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.Banner>
      <Container>{children}</Container>
    </S.Banner>
  )
}

const Title: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  ...rest
}) => (
  <Typography
    {...rest}
    variant='h1'
    fontWeight={({ typography }) => typography.fontWeightBold}
  >
    {children}
  </Typography>
)

const Description: React.FC<PropsWithChildren<TypographyProps>> = ({
  children,
  ...rest
}) => (
  <Typography {...rest} variant='subtitle1' lineHeight={1.5} color='gray'>
    {children}
  </Typography>
)

// export const Wrapper

export const Banner = {
  Container: BannerContainer,
  Title,
  Description,
  Wrapper,
}
