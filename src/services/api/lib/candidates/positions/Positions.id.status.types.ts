import { PhaseTypes, RequirementTypes } from '../../positions'
import { SkillTypes } from '../../skills'

export interface CandidatePositionStatusTypes {
  name: string
  email: string
  phoneNumber: string
  currentPhaseIndex: number
  phases: PhaseTypes[]
  requirements: RequirementTypes[]
  appliedAt: string
  skills: SkillTypes[]
}
