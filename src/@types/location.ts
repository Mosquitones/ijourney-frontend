import { Location } from 'react-router-dom'

export interface LocationTypes<T = unknown> extends Omit<Location, 'state'> {
  state: T
}
