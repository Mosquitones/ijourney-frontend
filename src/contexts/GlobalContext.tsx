import React, { PropsWithChildren } from 'react'

import {
  FeedbackContextWrapper,
  LanguageContextWrapper,
  LANGUAGES_DATA,
  LayoutContextWrapper,
} from '@eduplaytion/numetry-ui-kit'

import { i18n } from 'i18n'

import { AuthContextWrapper } from './auth/Auth.context'

export const GlobalContextWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <LayoutContextWrapper>
    <LanguageContextWrapper i18nProviderProps={i18n} languages={LANGUAGES_DATA}>
      <FeedbackContextWrapper>
        <AuthContextWrapper>{children}</AuthContextWrapper>
      </FeedbackContextWrapper>
    </LanguageContextWrapper>
  </LayoutContextWrapper>
)
