import {
  EMPLOYMENT_TYPE_ENUM,
  LOCATION_TYPE_ENUM,
  PHASE_STATUS_TYPE_ENUM,
  EnumValueTypes,
} from '@types'

import { SkillTypes } from '../skills'

export interface PhaseTypes {
  id: number
  name: string
  description: string
  sequenceIndex: number
  phaseStatusType: EnumValueTypes<typeof PHASE_STATUS_TYPE_ENUM>
}

export interface RequirementTypes {
  id: number
  skill: SkillTypes
  points: number
  done: boolean
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
  locationType: EnumValueTypes<typeof LOCATION_TYPE_ENUM>
  employmentType: EnumValueTypes<typeof EMPLOYMENT_TYPE_ENUM>
  recruiterId: number
  phases: PhaseTypes[]
  requirements: RequirementTypes[]
  companyName: string
  archived: boolean
}
