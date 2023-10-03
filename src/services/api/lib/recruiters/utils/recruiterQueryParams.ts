import {
  RecruiterPayloadQueryTypes,
  RecruiterServerQueryTypes,
} from '../Recruiters.types'

export const recruiterQueryParams = (params?: RecruiterPayloadQueryTypes) => {
  const serverParams: Partial<RecruiterServerQueryTypes> = {
    fullName: params?.['recruiter-name'],
    email: params?.email,
    rangeBetweenAges:
      params?.['min-age'] && params['max-age']
        ? `${params?.['min-age']}~${params?.['max-age']}`
        : undefined,
    genders: params?.genders,
  }

  return serverParams
}
