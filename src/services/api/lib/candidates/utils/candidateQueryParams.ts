import {
  CandidatePayloadQueryTypes,
  CandidateServerQueryTypes,
} from '../Candidate.types'

export const candidateQueryParams = (params?: CandidatePayloadQueryTypes) => {
  const serverParams: Partial<CandidateServerQueryTypes> = {
    fullName: params?.['candidate-name'],
    email: params?.email,
    rangeBetweenAges:
      params?.['min-age'] && params['max-age']
        ? `${params?.['min-age']}~${params?.['max-age']}`
        : undefined,
    genders: params?.genders,
    vulnerabilities: params?.vulnerabilities,
    skills: params?.['skill-ids'],
  }

  return serverParams
}
