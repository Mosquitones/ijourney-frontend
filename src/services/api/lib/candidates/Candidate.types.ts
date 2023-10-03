import { EnumValueTypes, GENDER_ENUM, VULNERABILITY_ENUM } from '@types'

import { SkillTypes } from '../skills'

export type CandidateTypes = {
  id: number
  position: number
  name: string
  location: string
  appliedAt: Date
  timeSpent: number
  points: number
}

export interface CandidatePayloadQueryTypes {
  'candidate-name': string
  email: string
  'min-age': number
  'max-age': number
  genders: EnumValueTypes<typeof GENDER_ENUM>[]
  vulnerabilities: EnumValueTypes<typeof VULNERABILITY_ENUM>[]
  'skill-ids': SkillTypes['id'][]
}

export interface CandidateServerQueryTypes {
  fullName: string
  email: string
  rangeBetweenAges: string // min~max
  genders: EnumValueTypes<typeof GENDER_ENUM>[]
  vulnerabilities: EnumValueTypes<typeof VULNERABILITY_ENUM>[]
  skills: SkillTypes['id'][]
}
