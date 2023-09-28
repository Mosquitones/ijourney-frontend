import { SignUpFormPropTypes } from '../SignUp.types'

export const SIGN_UP_INITIAL_VALUES: SignUpFormPropTypes = {
  fullName: '',
  email: '',

  password: '',
  passwordConfirmation: '',

  phoneNumber: '',
  dateOfBirth: null,

  picture: null,
  resume: null,
  skills: [],

  gender: null,
  sexualOrientation: null,
  raceEthnicity: null,

  familyIncome: null,
  hasDisability: null,
  whichDisability: '',
}
