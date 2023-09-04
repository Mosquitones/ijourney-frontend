/* eslint-disable @typescript-eslint/no-unused-vars */
export const EMPLOYMENT_TYPES_MAP = [
  {
    key: 'FULL_TIME',
    label: 'Período integral',
  },
  {
    key: 'PART_TIME',
    label: 'Período parcial',
  },
  {
    key: 'SELF_EMPLOYED',
    label: 'Autônomo',
  },
  {
    key: 'FREELANCE',
    label: 'Freelancer',
  },
  {
    key: 'CONTRACT',
    label: 'Contrato',
  },
  {
    key: 'INTERNSHIP',
    label: 'Estágio',
  },
  {
    key: 'APPRENTICESHIP',
    label: 'Estágio de aprendiz',
  },
  {
    key: 'LEADERSHIP_PROGRAM',
    label: 'Programa de liderança',
  },
  {
    key: 'INDIRECT_CONTRACT',
    label: 'Contrato indireto',
  },
] as const

export const LOCATION_TYPES_MAP = [
  {
    key: 'ON_SITE',
    label: 'Local',
  },
  {
    key: 'REMOTE',
    label: 'Remoto',
  },
  {
    key: 'HYBRID',
    label: 'Híbrido',
  },
] as const

export type EmploymentTypes = (typeof EMPLOYMENT_TYPES_MAP)[number]['key']
export type LocationTypes = (typeof LOCATION_TYPES_MAP)[number]['key']

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
