import React, { useEffect } from 'react'

import {
  HeaderComponent,
  SkipLinkComponent,
  useFeedback,
} from '@eduplaytion/numetry-ui-kit'
import { useTranslation } from 'react-i18next'
import { Outlet, useSearchParams } from 'react-router-dom'

import { LayoutMainStyles, LayoutStyles } from './DashboardLayout.styles'

export const DashboardLayout: React.FC = () => {
  const { t } = useTranslation()
  const { dialog } = useFeedback()
  const [urlParams] = useSearchParams()

  const status = urlParams.get('status')
  const message = urlParams.get('message') || undefined
  const action = urlParams.get('action')
  const actionLabel = urlParams.get('action_label')

  const hasAction = action && actionLabel

  useEffect(() => {
    if (status === 'login_failed') {
      dialog.show({
        content: {
          title: t('general.status.error.somethingWentWrong'),
          subtitle: message || undefined,
          footer:
            (hasAction && {
              visible: true,
              align: 'flex-end',
              buttons: [
                {
                  value: actionLabel,
                  onClick: () => {
                    window.location.href = action
                  },
                  variant: 'contained',
                },
              ],
            }) ||
            undefined,
        },
        status: 'error',
      })
    }
  }, [action, actionLabel, dialog, hasAction, message, status, t, urlParams])

  return (
    <LayoutStyles>
      <SkipLinkComponent />
      <HeaderComponent />
      <LayoutMainStyles>
        <Outlet />
      </LayoutMainStyles>
    </LayoutStyles>
  )
}
