import positionMethods from './Positions'
import positionCandidateMethods from './Positions.candidate.id'

export const PositionServices = {
  ...positionMethods,
  candidates: positionCandidateMethods,
}

export * from './Position.types'
