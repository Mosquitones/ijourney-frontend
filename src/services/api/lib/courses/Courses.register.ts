import {
  ApiResponseTypes,
  CourseRegisterPayloadTypes,
  CourseTypes,
  api,
} from 'services'

const create = async (payload: CourseRegisterPayloadTypes) => {
  const { data: response } = await api.post<ApiResponseTypes<CourseTypes>>(
    `/courses/register`,
    payload
  )

  return response.data
}

export default {
  post: create,
}
