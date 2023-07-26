import React, { PropsWithChildren } from 'react'

import { i18n } from 'i18n/i18n'

import { LANGUAGES_DATA } from 'i18n'

import { AuthContextWrapper } from '../auth/Auth.context'

import { FeedbackContextWrapper } from './feedback/Feedback.context'
import { LanguageContextWrapper } from './language/Language.context'
import { LayoutContextWrapper } from './layout/Layout.context'

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

export * from './feedback/Feedback.context'
export * from './language/Language.context'
export * from './layout/Layout.context'
