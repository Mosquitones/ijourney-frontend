import { t } from 'i18next'
import * as yup from 'yup'

export const LoginFormSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(t('pages.login.form.validation.email.required')),
  password: yup
    .string()
    .required(t('pages.login.form.validation.password.required')),
})
