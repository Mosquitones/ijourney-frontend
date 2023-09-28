import positionMethods from './Positions'
import positionsIdStatusMethods from './Positions.id.status'
import positionsPhasesMethods from './Positions.phases'
import positionRegisterMethods from './Positions.register'
import positionSavedDeleteMethods from './Positions.saved.delete'
import positionSavedRegisterMethods from './Positions.saved.register'

export const PositionServices = {
  ...positionMethods,
  phases: positionsPhasesMethods,
  id: {
    status: positionsIdStatusMethods,
  },
  register: positionRegisterMethods,
  saved: {
    register: positionSavedRegisterMethods,
    delete: positionSavedDeleteMethods,
  },
}

export * from './Positions.register.types'
