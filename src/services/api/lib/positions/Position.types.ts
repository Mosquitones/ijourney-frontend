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
  description: string
  city: string
  state: string
  creationDate: string
  locationType: string
  employmentType: string
  recruiterId: number
  phases: PhaseTypes[]
  requirements: RequirementTypes[]
  companyName: string
}
