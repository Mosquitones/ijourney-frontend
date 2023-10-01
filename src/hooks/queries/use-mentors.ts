import { useQuery } from 'react-query'

import { MentorServices, MentorTypes } from 'services'

import { QueryOptionTypes } from './Queries.types'

export const QUERY_KEY_MENTORS = ['/mentors', { method: 'GET' }]
export const useMentors = (options?: QueryOptionTypes<MentorTypes[]>) =>
  useQuery({
    ...options,
    queryKey: QUERY_KEY_MENTORS,
    queryFn: MentorServices.get,
  })
