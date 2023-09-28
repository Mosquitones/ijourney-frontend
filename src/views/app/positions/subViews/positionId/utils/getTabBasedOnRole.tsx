import React from 'react'

import { EnumValueTypes, ROLE_ENUM } from '@types'

import CandidatesTab from '../tabs/candidates/Candidates'
import DescriptionTab from '../tabs/description/Description'

type TabTypes = {
  id: 'description' | 'candidates' | 'culture-and-benefits'
  label: string
  content: React.ReactNode
  disabled?: boolean
}

const DESCRIPTION_TAB: TabTypes = {
  id: 'description',
  label: 'Descrição',
  content: <DescriptionTab />,
}

const CANDIDATES_TAB: TabTypes = {
  id: 'candidates',
  label: 'Candidatos',
  content: <CandidatesTab />,
}

const CULTURE_BENEFITS_TAB: TabTypes = {
  id: 'culture-and-benefits',
  label: 'Cultura e Benefícios',
  content: <div>Cultura e Benefícios</div>,
  disabled: true,
}

const DEFAULT_TABS: TabTypes[] = [DESCRIPTION_TAB, CULTURE_BENEFITS_TAB]

const CANDIDATE_TABS: TabTypes[] = DEFAULT_TABS

const RECRUITER_TABS: TabTypes[] = [
  DESCRIPTION_TAB,
  CANDIDATES_TAB,
  CULTURE_BENEFITS_TAB,
]

export const getTabsBasedOnRole = (role?: EnumValueTypes<typeof ROLE_ENUM>) => {
  if (!role) return DEFAULT_TABS

  const tabs: { [key in EnumValueTypes<typeof ROLE_ENUM>]: TabTypes[] } = {
    ADMIN: DEFAULT_TABS,
    RECRUITER: RECRUITER_TABS,
    CANDIDATE: CANDIDATE_TABS,
    COMPANY: DEFAULT_TABS,
  }

  return tabs[role]
}
