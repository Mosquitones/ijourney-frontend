import React from 'react'

import { UserRoleTypes } from 'services'

import CandidatesTab from '../tabs/candidates/Candidates'
import DescriptionTab from '../tabs/description/Description'

type TabTypes = {
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

const DESCRIPTION_TAB: TabTypes = {
  value: 'd7cb546d-71ab-4b00-8540-7ad9bdb3f476',
  label: 'Descrição',
  content: <DescriptionTab />,
}

const CANDIDATES_TAB: TabTypes = {
  value: 'adbfbf36-239a-4c57-b963-6c459819ba45',
  label: 'Candidatos',
  content: <CandidatesTab />,
}

const CULTURE_BENEFITS_TAB: TabTypes = {
  value: 'db674ef1-013f-49d3-92ac-b6d5db7aa09d',
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
    ADMIN: DEFAULT_TABS,
    RECRUITER: RECRUITER_TABS,
    CANDIDATE: CANDIDATE_TABS,
    COMPANY: DEFAULT_TABS,
  }

  return tabs[role]
}
