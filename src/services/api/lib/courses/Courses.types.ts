import { MentorTypes } from '../mentors'
import { SkillTypes } from '../skills'

export interface CourseRegisterPayloadTypes {
  title: string
  description: string
  picture: string
  createdAt: string
  skillsId: SkillTypes['id'][]
  mentorsId: MentorTypes['id'][]
}

export interface CourseTypes {
  id: number
  title: string
  description: string
  picture: string
  createdAt: string
  totalGraduatedCandidate: number
  ratingAverage: number
  totalReviews: number
  skills: SkillTypes[]
  mentors: MentorTypes[]
}
