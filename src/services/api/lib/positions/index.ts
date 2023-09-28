import positionMethods from './Positions'
import positionCandidateMethods from './Positions.candidate.id'
import positionIdMethods from './Positions.id'
import positionIdRankingMethods from './Positions.id.ranking'

export const PositionServices = {
  ...positionMethods,
  id: {
    ...positionIdMethods,
    ranking: positionIdRankingMethods,
  },
  candidates: positionCandidateMethods,
}

export * from './Positions.types'
