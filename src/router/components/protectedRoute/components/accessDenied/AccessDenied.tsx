import React from 'react'

import { useTranslation } from 'react-i18next'

import { useAuth } from 'contexts'

export const AccessDeniedComponent: React.FC = () => {
  const { t } = useTranslation()
  const { signOut } = useAuth()

  return (
    <div>
      <p>{t('!#Access denied')}</p>
      <button type='button' onClick={signOut}>
        {t('!#Go to login')}
      </button>
    </div>
  )
}
