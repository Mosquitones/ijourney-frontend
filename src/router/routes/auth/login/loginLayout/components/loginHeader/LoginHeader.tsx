import React from 'react'

import { ReactComponent as NumetryLogo } from 'assets/svg/numetry-logo-matematik.svg'

import { HeaderNumetryStyles } from './LoginHeader.styles'

export const LoginHeaderComponent = () => (
  <HeaderNumetryStyles position='absolute'>
    <NumetryLogo />
  </HeaderNumetryStyles>
)
