/* eslint-disable react-hooks/rules-of-hooks */
import { ChipListPropTypes } from 'components'
import { useAuth } from 'contexts'
import {
  EMPLOYMENT_TYPES_MAP,
  EmploymentTypes,
  LOCATION_TYPES_MAP,
  LocationTypes,
} from 'services'

import { currencyFormatter } from './numberFormat'

type GetChipParams = {
  employmentType: EmploymentTypes
  locationType: LocationTypes
  salary?: number
}

export const getChips = (params: GetChipParams): ChipListPropTypes['chips'] => {
  const { isUserRole } = useAuth()

  const employment = EMPLOYMENT_TYPES_MAP.find(
    (employment) => employment.key === params.employmentType
  )
  const location = LOCATION_TYPES_MAP.find(
    (location) => location.key === params.locationType
  )

  if (!employment || !location) return []

  const DEFAULT_RETURN: ChipListPropTypes['chips'] = [
    {
      label: employment.label,
      color: 'default',
      variant: 'outlined',
    },
    {
      label: location.label,
      color: 'error',
      variant: 'outlined',
    },
  ]

  if (isUserRole.CANDIDATE && params.salary) {
    return [
      ...DEFAULT_RETURN,
      {
        label: currencyFormatter.format(params.salary),
        color: 'info',
        variant: 'outlined',
      },
    ]
  }

  return DEFAULT_RETURN
}
