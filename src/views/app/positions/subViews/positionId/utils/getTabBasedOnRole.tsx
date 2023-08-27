import React from 'react'

import { UserRoleTypes } from 'services'

import CandidatesPage from '../tabs/candidates/Candidates'
import DescriptionPage from '../tabs/description/Description'

type TabTypes = {
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

const DESCRIPTION_TAB: TabTypes = {
  value: String(0),
  label: 'Descrição',
  content: <DescriptionPage />,
}

const CANDIDATES_TAB: TabTypes = {
  value: String(1),
  label: 'Candidatos',
  content: <CandidatesPage />,
}

const CULTURE_BENEFITS_TAB: TabTypes = {
  value: String(2),
  label: 'Cultura e Benefícios',
  content: 'Cultura e Benefícios',
  disabled: true,
}

const DEFAULT_TABS: TabTypes[] = [DESCRIPTION_TAB, CULTURE_BENEFITS_TAB]

const CANDIDATE_TABS: TabTypes[] = DEFAULT_TABS

const RECRUITER_TABS: TabTypes[] = [
  DESCRIPTION_TAB,
  CANDIDATES_TAB,
  CULTURE_BENEFITS_TAB,
]

export const getTabsBasedOnRole = (role?: UserRoleTypes) => {
  if (!role) return DEFAULT_TABS

  const tabs: { [key in UserRoleTypes]: TabTypes[] } = {
    admin: DEFAULT_TABS,
    recruiter: RECRUITER_TABS,
    candidate: CANDIDATE_TABS,
    company: DEFAULT_TABS,
  }

  return tabs[role]
}
