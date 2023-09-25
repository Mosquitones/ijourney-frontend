import { ApiResponseTypes, api } from 'services'

import { SkillTypes } from './Skill.types'

const findAll = async () => {
  const { data: response } = await api.get<ApiResponseTypes<SkillTypes[]>>(
    `/skills`
  )

  return response.data
}

export default {
  findAll,
}
