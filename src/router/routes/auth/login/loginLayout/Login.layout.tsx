import React from 'react'

import { LoginCharactersPNG } from '@eduplaytion/numetry-ui-kit'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import {
  CharacterWrapperComponent,
  LoginFooterComponent,
  LoginHeaderComponent,
} from './components'
import { CharactersStyles, LoginWrapperStyles } from './Login.layout.styles'

export const LoginLayoutComponent: React.FC = () => {
  const { t } = useTranslation()

  return (
    <LoginWrapperStyles>
      <LoginHeaderComponent />
      <CharactersStyles>
        <img
          src={LoginCharactersPNG}
          loading='lazy'
          alt={t('general.imageAlt.login.gameCharacters')}
        />
      </CharactersStyles>
      <CharacterWrapperComponent>
        <Outlet />
      </CharacterWrapperComponent>
      <LoginFooterComponent title={t('pages.login.aGameBy')} />
    </LoginWrapperStyles>
  )
}
