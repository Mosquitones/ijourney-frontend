import { ApiResponseTypes, CandidateTypes, CourseTypes, api } from 'services'

const completeCourseById = async (
  candidateId: CandidateTypes['id'],
  courseId: CourseTypes['id']
) => {
  const { data: response } = await api.post<ApiResponseTypes<CandidateTypes>>(
    `/candidates/${candidateId}/courses/${courseId}/complete`
  )

  return response.data
}

export default {
  post: completeCourseById,
}
