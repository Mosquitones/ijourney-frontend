import positionMethods from './Positions'
import positionRegisterMethods from './Positions.register'
import positionSavedDeleteMethods from './Positions.saved.delete'
import positionSavedRegisterMethods from './Positions.saved.register'

export const PositionServices = {
  ...positionMethods,
  register: positionRegisterMethods,
  saved: {
    register: positionSavedRegisterMethods,
    delete: positionSavedDeleteMethods,
  },
}

export * from './Positions.register.types'
