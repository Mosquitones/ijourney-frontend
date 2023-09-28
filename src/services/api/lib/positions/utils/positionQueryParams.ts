import {
  PositionPayloadQueryTypes,
  PositionServerQueryTypes,
} from '../Positions.types'

export const positionQueryParams = (params?: PositionPayloadQueryTypes) => {
  const serverParams: Partial<PositionServerQueryTypes> = {
    employmentType: params?.['employment-type'],
    locationType: params?.['location-type'],
    positionName: params?.['position-name'],
    vulnerabilities: params?.vulnerabilities,
    skills: params?.['skill-ids'],
    stateName: params?.['city-or-state-name'],
    creationDate:
      params?.['min-creation-date'] && params['max-creation-date']
        ? `${params?.['min-creation-date']}~${params?.['max-creation-date']}`
        : undefined,
    salaryRange:
      !!params?.['min-salary'] && !!params?.['max-salary']
        ? `${params?.['min-salary']}~${params?.['max-salary']}`
        : undefined,
  }

  return serverParams
}
