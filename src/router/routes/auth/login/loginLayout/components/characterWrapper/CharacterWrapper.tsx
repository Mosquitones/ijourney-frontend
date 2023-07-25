import React, { PropsWithChildren } from 'react'

import {
  LoginFormContainerStyles,
  LoginFormStyles,
} from './CharacterWrapper.styles'

export const CharacterWrapperComponent: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <LoginFormContainerStyles>
      <LoginFormStyles>{children}</LoginFormStyles>
    </LoginFormContainerStyles>
  )
}
