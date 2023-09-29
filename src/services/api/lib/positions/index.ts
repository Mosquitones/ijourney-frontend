import positionMethods from './Positions'
import positionCandidateMethods from './Positions.candidate.id'
import positionIdMethods from './Positions.id'
import positionIdArchivedRegisterMethods from './Positions.id.archived.register'
import positionIdRankingMethods from './Positions.id.ranking'

export const PositionServices = {
  ...positionMethods,
  id: {
    ...positionIdMethods,
    ranking: positionIdRankingMethods,
    archived: {
      register: positionIdArchivedRegisterMethods,
    },
  },
  candidates: positionCandidateMethods,
}

export * from './Positions.types'
