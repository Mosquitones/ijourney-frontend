import { CandidateIdServices } from './id'
import { PositionServices } from './positions'
import { RegisterServices } from './register'

export const CandidateServices = {
  id: CandidateIdServices,
  register: RegisterServices,
  positions: PositionServices,
}

export * from './Candidate.types'
export * from './register'
export * from './id'
