import { useQuery } from 'react-query'

import { SkillServices, SkillTypes } from 'services'

import { QueryOptionTypes } from './Queries.types'

export const QUERY_KEY_SKILLS = ['/skills', { method: 'GET' }]
export const useSkills = (options?: QueryOptionTypes<SkillTypes[]>) =>
  useQuery({
    ...options,
    queryKey: QUERY_KEY_SKILLS,
    queryFn: SkillServices.findAll,
  })
