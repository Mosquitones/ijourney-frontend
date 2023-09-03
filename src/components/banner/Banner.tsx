import React, { PropsWithChildren } from 'react'

import { KeyboardBackspaceOutlined } from '@mui/icons-material'
import {
  BoxProps,
  Chip,
  Container,
  TabProps,
  TabsProps,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material'

import * as S from './Banner.styles'

const Wrapper: React.FC<
  PropsWithChildren<BoxProps & { renderBackButton?: boolean }>
> = ({ children, renderBackButton, ...rest }) => {
  const ariaLabel = 'Voltar para página anterior'

  return (
    <S.Wrapper {...rest}>
      {renderBackButton && (
        <Tooltip title={ariaLabel} placement='top'>
          <Chip
            icon={<KeyboardBackspaceOutlined />}
            label='Voltar'
            variant='filled'
            color='default'
            aria-label={ariaLabel}
            component='a'
            href='javascript:history.back()'
            onClick={() => null}
          />
        </Tooltip>
      )}
      {children}
    </S.Wrapper>
  )
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
  <Typography
    {...rest}
    variant='subtitle1'
    lineHeight={1.5}
    color='text.secondary'
  >
    {children}
  </Typography>
)

const Tabs: React.FC<PropsWithChildren<TabsProps>> = ({
  children,
  ...rest
}) => {
  return (
    <S.Tabs
      {...rest}
      TabIndicatorProps={{ sx: { display: 'none' } }}
      variant='scrollable'
    >
      {children}
    </S.Tabs>
  )
}

const Tab: React.FC<PropsWithChildren<TabProps>> = ({ children, ...rest }) => (
  <S.Tab {...rest}>{children}</S.Tab>
)

export const Banner = {
  Container: BannerContainer,
  Title,
  Description,
  Wrapper,
  Tabs,
  Tab,
}
