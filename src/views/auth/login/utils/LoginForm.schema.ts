import * as yup from 'yup'

export const LoginFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})
