import positionIdMethods from './Position.id'
import positionIdRankingMethods from './Position.id.ranking'
import positionMethods from './Positions'
import positionCandidateMethods from './Positions.candidate.id'

export const PositionServices = {
  ...positionMethods,
  id: {
    ...positionIdMethods,
    ranking: positionIdRankingMethods,
  },
  candidates: positionCandidateMethods,
}

export * from './Position.types'
