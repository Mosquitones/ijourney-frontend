import React from 'react'

import { EduplaytionLogoSVG } from '@eduplaytion/numetry-ui-kit'
import { Typography } from '@mui/material'

import { LoginFooterStyles } from './LoginFooter.styles'

export const LoginFooterComponent: React.FC<{ title: string }> = ({
  title,
}) => {
  return (
    <LoginFooterStyles
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.75 }}
    >
      <Typography>{title}</Typography>
      <img src={EduplaytionLogoSVG} alt='Eduplayition Logo' />
    </LoginFooterStyles>
  )
}
