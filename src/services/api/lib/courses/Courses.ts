import { ApiResponseTypes, CourseTypes, api } from 'services'

const findAll = async () => {
  const { data: response } = await api.get<ApiResponseTypes<CourseTypes[]>>(
    `/courses`
  )

  return response.data
}

export default {
  get: findAll,
}
