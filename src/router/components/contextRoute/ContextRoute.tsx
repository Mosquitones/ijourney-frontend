import React from 'react'

import { Outlet } from 'react-router-dom'

import { ContextRoutePropTypes } from './ContextRoute.types'

export const ContextRoute: React.FC<ContextRoutePropTypes> = ({ wrapper }) => {
  const providers = Array.isArray(wrapper) ? wrapper : [wrapper]

  return providers.reduce(
    (child, Element) => <Element>{child}</Element>,
    <Outlet />
  )
}

export * from './ContextRoute.types'
