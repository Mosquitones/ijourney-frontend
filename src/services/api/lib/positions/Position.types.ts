/* eslint-disable @typescript-eslint/no-unused-vars */
const EMPLOYMENTS = {
  FULL_TIME: {
    key: 'FULL_TIME',
    label: 'Período integral',
  },
  PART_TIME: {
    key: 'PART_TIME',
    label: 'Período parcial',
  },
  SELF_EMPLOYED: {
    key: 'SELF_EMPLOYED',
    label: 'Autônomo',
  },
  FREELANCE: {
    key: 'FREELANCE',
    label: 'Freelancer',
  },
  CONTRACT: {
    key: 'CONTRACT',
    label: 'Contrato',
  },
  INTERNSHIP: {
    key: 'INTERNSHIP',
    label: 'Estágio',
  },
  APPRENTICESHIP: {
    key: 'APPRENTICESHIP',
    label: 'Estágio de aprendiz',
  },
  LEADERSHIP_PROGRAM: {
    key: 'LEADERSHIP_PROGRAM',
    label: 'Programa de liderança',
  },
  INDIRECT_CONTRACT: {
    key: 'INDIRECT_CONTRACT',
    label: 'Contrato indireto',
  },
} as const

const TEST = [
  {
    key: 'FULL_TIME',
    label: 'Período integral',
  },
  {
    key: 'PART_TIME',
    label: 'Período parcial',
  },
] as const

// export type TestTypes = (typeof TEST)[keyof typeof TEST]['']

const LOCATIONS = {
  ON_SITE: {
    key: 'ON_SITE',
    label: 'Local',
  },
  REMOTE: {
    key: 'REMOTE',
    label: 'Remoto',
  },
  HYBRID: {
    key: 'HYBRID',
    label: 'Híbrido',
  },
}

export type EmploymentTypes =
  (typeof EMPLOYMENTS)[keyof typeof EMPLOYMENTS]['key']

export type LocationTypes = (typeof LOCATIONS)[keyof typeof LOCATIONS]['key']

export interface PhaseTypes {
  id: number
  name: string
  description: string
}

export interface SkillTypes {
  id: number
  name: string
}

export interface RequirementTypes {
  id: number
  skill: SkillTypes
  points: number
}

export interface PositionTypes {
  id: number
  salaryRange: number
  title: string
  shortDescription: string
  longDescription: string
  city: string
  state: string
  creationDate: string
  locationType: LocationTypes
  employmentType: EmploymentTypes
  recruiterId: number
  phases: PhaseTypes[]
  requirements: RequirementTypes[]
  companyName: string
}
