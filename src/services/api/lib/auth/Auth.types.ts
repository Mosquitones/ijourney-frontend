export interface AuthLoginPayloadTypes {
  loginId: string
  password: string
}

interface AuthLoginCommonTypes {
  id: number
  name: string
  isActive: boolean
}

export interface AuthLoginResponseInputTypes extends AuthLoginCommonTypes {
  fusionauth_user_uuid: string
  feide_id: string
  feide_id_token: string
  feide_access_token: string
  created_at: string
  updated_at: string
  teacher_type: string
}

export interface AuthLoginResponseTypes extends AuthLoginCommonTypes {
  createdAt: string
  updatedAt: string
  fusionauthUserUuid: string
  feideId: string
  teacherType: string
  feideIdToken: string
  feideAccessToken: string
}
