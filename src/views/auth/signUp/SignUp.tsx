/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'

import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import {
  Alert,
  Autocomplete,
  Avatar,
  Box,
  Checkbox,
  Divider,
  Fade,
  Link,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  GENDER_ENUM,
  GENDER_LIST,
  ROLE_ENUM,
  VULNERABILITY_ENUM,
  SEXUAL_ORIENTATION_LIST,
  RACE_ETHNICITY_LIST,
  FAMILY_INCOME_LIST,
  DISABILITY_ANSWERS_LIST,
  COMPANY_ENUM,
  EnumValueTypes,
  SEXUAL_ORIENTATION_ENUM,
  RACE_ETHNICITY_ENUM,
  FAMILY_INCOME_ENUM,
  AGE_OF_THE_ELDERLY,
} from '@types'
import { differenceInYears, format } from 'date-fns'
import { Formik, useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { IMaskInput } from 'react-imask'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { Button, Input, Logo } from 'components'
import { useAuth } from 'contexts'
import { useSessionStorage, useSkills } from 'hooks'
import { ROUTES } from 'router'
import { RegisterCandidatePayloadTypes, SkillServices } from 'services'
import { convertToBase64, deepEquals } from 'utils'

import * as S from './SignUp.styles'
import { SignUpFormPropTypes } from './SignUp.types'
import { SIGN_UP_INITIAL_VALUES } from './utils/SignUpForm.initial'
import { SignUpFormSchema } from './utils/SignUpForm.schema'

type StoredSignUpFormPropTypes = {
  form: SignUpFormPropTypes
  stepIndex: number
}

const PROFILE_SESSION_KEY = 'profile-sign-up'

const STORED_SIGN_UP_FORM_INITIAL_VALUES: StoredSignUpFormPropTypes = {
  form: SIGN_UP_INITIAL_VALUES,
  stepIndex: 0,
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, any>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props
    return (
      <IMaskInput
        {...other}
        mask='+55 (##) #.####-####'
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    )
  }
)

export const renderSelectedCheckbox = (isSelected: boolean) => (
  <Checkbox
    icon={<CheckBoxOutlineBlank fontSize='small' />}
    checkedIcon={<CheckBox fontSize='small' />}
    sx={{ mr: 1 }}
    checked={isSelected}
  />
)

export default function SignUpPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isSigningUp, isSigningIn, signUp } = useAuth()

  const skillsQuery = useSkills()

  const ctaButtonRef = React.useRef<HTMLButtonElement>(null)

  const [storedSignUpForm, setStoredSignUpForm] =
    useSessionStorage<StoredSignUpFormPropTypes>(
      PROFILE_SESSION_KEY,
      STORED_SIGN_UP_FORM_INITIAL_VALUES
    )

  const [activeStep, setActiveStep] = useState(storedSignUpForm.stepIndex)

  const formik = useFormik<SignUpFormPropTypes>({
    initialValues: storedSignUpForm.form,
    validationSchema: SignUpFormSchema,
    validateOnChange: true,
    validateOnBlur: true,
    isInitialValid: false,
    onSubmit: async (values) => {
      console.log(values)
      if (
        !values.dateOfBirth ||
        !values.gender ||
        !values.resume ||
        !values.sexualOrientation ||
        !values.raceEthnicity ||
        !values.familyIncome ||
        values.hasDisability === null
      ) {
        return
      }

      const vulnerabilityList: EnumValueTypes<typeof VULNERABILITY_ENUM>[] = []

      if (
        values.sexualOrientation !== SEXUAL_ORIENTATION_ENUM.HETEROSEXUAL &&
        values.sexualOrientation !== SEXUAL_ORIENTATION_ENUM.UNKNOWN
      ) {
        vulnerabilityList.push(VULNERABILITY_ENUM.LGBTQIA)
      }

      if (
        values.raceEthnicity !== RACE_ETHNICITY_ENUM.YELLOW &&
        values.raceEthnicity !== RACE_ETHNICITY_ENUM.WHITE &&
        values.raceEthnicity !== RACE_ETHNICITY_ENUM.DONT_KNOW &&
        values.raceEthnicity !== RACE_ETHNICITY_ENUM.UNKNOWN
      ) {
        vulnerabilityList.push(VULNERABILITY_ENUM.ETHNIC_RACIAL)
      }

      if (values.hasDisability) {
        vulnerabilityList.push(VULNERABILITY_ENUM.DISABILITIES_PEOPLE)
      }

      if (
        values.familyIncome !== FAMILY_INCOME_ENUM.A &&
        values.familyIncome !== FAMILY_INCOME_ENUM.B1
      ) {
        if (values.familyIncome === FAMILY_INCOME_ENUM.B2) {
          vulnerabilityList.push(VULNERABILITY_ENUM.FAMILY_INCOME_B)
        }
        if (values.familyIncome === FAMILY_INCOME_ENUM.C) {
          vulnerabilityList.push(VULNERABILITY_ENUM.FAMILY_INCOME_C)
        }

        if (values.familyIncome === FAMILY_INCOME_ENUM.D) {
          vulnerabilityList.push(VULNERABILITY_ENUM.FAMILY_INCOME_D)
        }

        if (values.familyIncome === FAMILY_INCOME_ENUM.E) {
          vulnerabilityList.push(VULNERABILITY_ENUM.FAMILY_INCOME_E)
        }
      }

      const dateOfBirth = new Date(values.dateOfBirth)

      if (differenceInYears(new Date(), dateOfBirth) >= AGE_OF_THE_ELDERLY) {
        vulnerabilityList.push(VULNERABILITY_ENUM.AGE_GROUP)
      }

      const picture =
        values.picture instanceof File
          ? await convertToBase64(values.picture)
          : undefined
      const resumeAsBase64 = await convertToBase64(values.resume)

      const skillsId = values.skills.flatMap((skill) => skill.id)

      const payload: RegisterCandidatePayloadTypes = {
        dateOfBirth,
        email: values.email,
        fullName: values.fullName,
        gender: values.gender,
        password: values.password,
        phoneNumber: values.phoneNumber,
        picture,
        resume: resumeAsBase64,
        skillsId,
        companyId: COMPANY_ENUM.ID,
        userType: ROLE_ENUM.CANDIDATE,
        vulnerabilityList,
      }

      signUp(payload, {
        onSuccess: () => {
          sessionStorage.removeItem(PROFILE_SESSION_KEY)
        },
      })
    },
  })

  const noOptionsText = 'Nenhuma opção encontrada'

  const selectedSexualOrientation = useMemo(
    () =>
      SEXUAL_ORIENTATION_LIST.find(
        (where) => where.value === formik.values.sexualOrientation
      ) || null,
    [formik.values.sexualOrientation]
  )

  const selectedRaceEthnicity = useMemo(
    () =>
      RACE_ETHNICITY_LIST.find(
        (where) => where.value === formik.values.raceEthnicity
      ) || null,
    [formik.values.raceEthnicity]
  )

  const selectedFamilyIncome = useMemo(
    () =>
      FAMILY_INCOME_LIST.find(
        (where) => where.value === formik.values.familyIncome
      ) || null,
    [formik.values.familyIncome]
  )

  const selectedHasDisability = useMemo(
    () =>
      DISABILITY_ANSWERS_LIST.find(
        (where) => where.value === formik.values.hasDisability
      ) || null,
    [formik.values.hasDisability]
  )

  const selectedGender = useMemo(
    () =>
      GENDER_LIST.find((where) => where.value === formik.values.gender) || null,
    [formik.values.gender]
  )

  const clickAtCtaButton = (e: React.KeyboardEvent<unknown>) => {
    if (e.key === 'Enter' && !ctaButtonRef.current?.disabled) {
      ctaButtonRef.current?.click()
    }
  }

  const steps = [
    {
      key: 'first-step',
      isValid: !formik.errors.fullName && !formik.errors.email,
      content: (
        <>
          <Input
            {...formik.getFieldProps('fullName')}
            error={formik.touched.fullName && !!formik.errors.fullName}
            helperText={
              formik.touched.fullName ? formik.errors.fullName : undefined
            }
            label='Nome completo'
            fullWidth
            InputLabelProps={{ required: true }}
          />
          <Input
            {...formik.getFieldProps('email')}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email ? formik.errors.email : undefined}
            label='E-mail'
            fullWidth
            InputLabelProps={{ required: true }}
            onKeyDown={clickAtCtaButton}
          />
        </>
      ),
    },
    {
      key: 'second-step',
      isValid: !formik.errors.password && !formik.errors.passwordConfirmation,
      content: (
        <>
          <Input
            {...formik.getFieldProps('password')}
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password ? formik.errors.password : undefined
            }
            label='Senha'
            placeholder='********'
            type='password'
            fullWidth
            InputLabelProps={{ required: true }}
          />
          <Input
            {...formik.getFieldProps('passwordConfirmation')}
            error={
              formik.touched.passwordConfirmation &&
              !!formik.errors.passwordConfirmation
            }
            helperText={
              formik.touched.passwordConfirmation
                ? formik.errors.passwordConfirmation
                : undefined
            }
            label='Confirmação de senha'
            placeholder='********'
            type='password'
            fullWidth
            InputLabelProps={{ required: true }}
            onKeyDown={clickAtCtaButton}
          />
        </>
      ),
    },
    {
      key: 'third-step',
      isValid: !formik.errors.phoneNumber && !formik.errors.dateOfBirth,
      content: (
        <>
          <Input
            {...formik.getFieldProps('phoneNumber')}
            type='tel'
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={
              formik.touched.phoneNumber ? formik.errors.phoneNumber : undefined
            }
            label='Número de telefone'
            InputLabelProps={{ required: true }}
            InputProps={{
              inputComponent: TextMaskCustom,
              startAdornment: (
                <>
                  <Tooltip title='Somente disponível para o Brasil'>
                    <Box
                      sx={{
                        ml: '-1.4rem',
                        px: '1.4rem',
                        py: '1rem',
                        cursor: 'help',
                      }}
                    >
                      <Avatar
                        variant='rounded'
                        sx={{ height: 20, width: 30 }}
                        src='https://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg'
                      />
                    </Box>
                  </Tooltip>
                  <Divider orientation='vertical' flexItem sx={{ mr: 1 }} />
                </>
              ),
            }}
            placeholder='+55 (__) _.____-____'
            fullWidth
          />
          <Input
            {...formik.getFieldProps('dateOfBirth')}
            type='date'
            value={formik.values.dateOfBirth || ''}
            error={formik.touched.dateOfBirth && !!formik.errors.dateOfBirth}
            helperText={
              formik.touched.dateOfBirth ? formik.errors.dateOfBirth : undefined
            }
            label='Data de Nascimento'
            placeholder='dd/mm/yyyy'
            fullWidth
            InputLabelProps={{ required: true }}
            onKeyDown={clickAtCtaButton}
          />
        </>
      ),
    },
    {
      key: 'fourth-step',
      isValid:
        !formik.errors.picture &&
        !formik.errors.resume &&
        !formik.errors.skills,
      content: (
        <>
          <Box
            display='flex'
            gap={2}
            alignItems='center'
            justifyContent='space-between'
          >
            <Input
              {...formik.getFieldProps('picture')}
              value={undefined}
              type='file'
              fileName={formik.values.picture?.name}
              error={formik.touched.picture && !!formik.errors.picture}
              helperText={
                formik.touched.picture ? formik.errors.picture : undefined
              }
              inputProps={{ accept: 'image/*' }}
              label='Imagem de perfil (opcional)'
              placeholder='Escolha um arquivo de IMAGEM'
              onChange={async (e) => {
                const { files } = e.target as HTMLInputElement

                if (files) {
                  const file = files[0]
                  formik.setFieldValue('picture', file)
                }
              }}
              fullWidth
            />
            {formik.values.picture && formik.values.picture instanceof File && (
              <Avatar
                alt={formik.values.fullName}
                variant='rounded'
                src={URL.createObjectURL(formik.values.picture)}
                sx={{ width: 80, height: 80 }}
              />
            )}
          </Box>
          <Input
            {...formik.getFieldProps('resume')}
            type='file'
            value={undefined}
            fileName={formik.values.resume?.name}
            error={formik.touched.resume && !!formik.errors.resume}
            helperText={
              formik.touched.resume ? formik.errors.resume : undefined
            }
            inputProps={{ accept: '.pdf' }}
            label='Currículo'
            placeholder='Escolha um arquivo PDF'
            onChange={async (e) => {
              const { files } = e.target as HTMLInputElement

              if (files) {
                const file = files[0]
                formik.setFieldValue('resume', file)
              }
            }}
            fullWidth
            InputLabelProps={{ required: true }}
          />
          <Autocomplete
            id='skills-autocomplete-box'
            multiple
            value={formik.values.skills}
            options={skillsQuery.data || []}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                {renderSelectedCheckbox(selected)}
                {option.name}
              </li>
            )}
            noOptionsText={noOptionsText}
            onChange={(_, skills) => {
              if (skills) {
                formik.setFieldValue('skills', skills)
              }
            }}
            // onKeyDown={clickAtCtaButton}
            renderInput={(params) => {
              params.id = `skills`

              return (
                <Input
                  {...params}
                  name={params.id}
                  error={formik.touched.skills && !!formik.errors.skills}
                  helperText={
                    formik.touched.skills
                      ? Array.isArray(formik.errors.skills)
                        ? formik.errors.skills.join(', ')
                        : formik.errors.skills
                      : undefined
                  }
                  label='Quais são as suas habilidades?'
                  placeholder='Selecione'
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    required: true,
                  }}
                />
              )
            }}
          />
        </>
      ),
    },
    {
      key: 'fifth-step',
      isValid: !formik.errors.gender && !formik.errors.sexualOrientation,
      content: (
        <>
          <Autocomplete
            id='gender-autocomplete-box'
            autoHighlight
            disablePortal
            fullWidth
            value={selectedGender}
            inputValue={selectedGender?.label}
            options={GENDER_LIST}
            getOptionLabel={(option) => option.label}
            onChange={(_, gender, reason) => {
              if (gender) formik.setFieldValue('gender', gender.value)
              if (reason === 'clear') {
                formik.setFieldValue('gender', null)
              }
            }}
            noOptionsText={noOptionsText}
            onBlur={(e) => formik.handleBlur('gender')(e)}
            renderInput={(params) => {
              params.id = 'gender'

              return (
                <Input
                  {...params}
                  name={params.id}
                  error={formik.touched.gender && !!formik.errors.gender}
                  helperText={
                    formik.touched.gender ? formik.errors.gender : undefined
                  }
                  label='Qual sua identidade de gênero?'
                  placeholder='Selecione'
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    required: true,
                  }}
                />
              )
            }}
          />
          <Autocomplete
            id='sexual-orientation-autocomplete-box'
            autoHighlight
            disablePortal
            fullWidth
            value={selectedSexualOrientation}
            inputValue={selectedSexualOrientation?.label}
            noOptionsText={noOptionsText}
            options={SEXUAL_ORIENTATION_LIST}
            getOptionLabel={(option) => option.label}
            onChange={(_, sexualOrientation, reason) => {
              if (sexualOrientation) {
                formik.setFieldValue(
                  'sexualOrientation',
                  sexualOrientation.value
                )
              }

              if (reason === 'clear') {
                formik.setFieldValue('sexualOrientation', null)
              }
            }}
            onBlur={(e) => formik.handleBlur('sexualOrientation')(e)}
            renderInput={(params) => {
              params.id = 'sexualOrientation'

              return (
                <Input
                  {...params}
                  name={params.id}
                  error={
                    formik.touched.sexualOrientation &&
                    !!formik.errors.sexualOrientation
                  }
                  helperText={
                    formik.touched.sexualOrientation
                      ? formik.errors.sexualOrientation
                      : undefined
                  }
                  label='Qual sua orientação sexual?'
                  placeholder='Selecione'
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    required: true,
                  }}
                />
              )
            }}
          />
        </>
      ),
    },
    {
      key: 'sixth-step',
      isValid: !formik.errors.raceEthnicity && !formik.errors.familyIncome,
      content: (
        <>
          <Autocomplete
            id='race-ethnicity-autocomplete-box'
            autoHighlight
            disablePortal
            fullWidth
            value={selectedRaceEthnicity}
            inputValue={selectedRaceEthnicity?.label}
            options={RACE_ETHNICITY_LIST}
            noOptionsText={noOptionsText}
            getOptionLabel={(option) => option.label}
            onChange={(_, raceEthnicity, reason) => {
              if (raceEthnicity) {
                formik.setFieldValue('raceEthnicity', raceEthnicity.value)
              }

              if (reason === 'clear') {
                formik.setFieldValue('raceEthnicity', null)
              }
            }}
            onBlur={(e) => formik.handleBlur('raceEthnicity')(e)}
            renderInput={(params) => {
              params.id = 'raceEthnicity'

              return (
                <Input
                  {...params}
                  name={params.id}
                  error={
                    formik.touched.raceEthnicity &&
                    !!formik.errors.raceEthnicity
                  }
                  helperText={
                    formik.touched.raceEthnicity
                      ? formik.errors.raceEthnicity
                      : undefined
                  }
                  label='Como você se identifica?'
                  placeholder='Selecione'
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    required: true,
                  }}
                />
              )
            }}
          />
          <Autocomplete
            id='family-income-autocomplete-box'
            autoHighlight
            disablePortal
            fullWidth
            value={selectedFamilyIncome}
            inputValue={selectedFamilyIncome?.label}
            options={FAMILY_INCOME_LIST}
            noOptionsText={noOptionsText}
            getOptionLabel={(option) => option.label}
            onChange={(_, familyIncome, reason) => {
              if (familyIncome) {
                formik.setFieldValue('familyIncome', familyIncome.value)
              }

              if (reason === 'clear') {
                formik.setFieldValue('familyIncome', null)
              }
            }}
            onKeyDown={clickAtCtaButton}
            onBlur={(e) => formik.handleBlur('familyIncome')(e)}
            renderInput={(params) => {
              params.id = 'familyIncome'

              return (
                <Input
                  {...params}
                  name={params.id}
                  error={
                    formik.touched.familyIncome && !!formik.errors.familyIncome
                  }
                  helperText={
                    formik.touched.familyIncome
                      ? formik.errors.familyIncome
                      : undefined
                  }
                  label='Qual sua renda familiar mensal? '
                  placeholder='Renda familiar'
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    required: true,
                  }}
                />
              )
            }}
          />
        </>
      ),
    },
    {
      key: 'seventh-step',
      isValid:
        formik.errors.hasDisability !== null && !formik.errors.whichDisability,
      content: (
        <>
          <Autocomplete
            id='has-disability-autocomplete-box'
            autoHighlight
            disablePortal
            fullWidth
            value={selectedHasDisability}
            inputValue={selectedHasDisability?.label}
            noOptionsText={noOptionsText}
            options={DISABILITY_ANSWERS_LIST}
            getOptionLabel={(option) => option.label}
            onChange={(_, hasDisability, reason) => {
              if (hasDisability !== null) {
                formik.setFieldValue('hasDisability', hasDisability.value)
              }

              if (reason === 'clear') {
                formik.setFieldValue('hasDisability', null)
              }
            }}
            onBlur={(e) => formik.handleBlur('hasDisability')(e)}
            renderInput={(params) => {
              params.id = 'hasDisability'

              return (
                <Input
                  {...params}
                  name={params.id}
                  error={
                    formik.touched.hasDisability &&
                    !!formik.errors.hasDisability
                  }
                  helperText={
                    formik.touched.hasDisability
                      ? formik.errors.hasDisability
                      : undefined
                  }
                  label='Possui alguma deficiência?'
                  placeholder='Deficiência'
                  onKeyDown={clickAtCtaButton}
                  InputLabelProps={{
                    ...params.InputLabelProps,
                    required: true,
                  }}
                />
              )
            }}
          />
          {formik.values.hasDisability && (
            <Input
              {...formik.getFieldProps('whichDisability')}
              error={
                formik.touched.whichDisability &&
                !!formik.errors.whichDisability
              }
              helperText={
                formik.touched.whichDisability
                  ? formik.errors.whichDisability
                  : undefined
              }
              label='Informe o número do CID (laudo médico).'
              fullWidth
              onKeyDown={clickAtCtaButton}
            />
          )}
        </>
      ),
    },
  ] as const

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const maxSteps = steps.length
  const isLastStep = activeStep === maxSteps - 1
  const isFirstStep = activeStep === 0

  useEffect(() => {
    if (activeStep !== storedSignUpForm.stepIndex) {
      setStoredSignUpForm({
        ...storedSignUpForm,
        stepIndex: activeStep,
      })
    }

    const isStoredSignUpFormDifferentFromFormik = !deepEquals(
      storedSignUpForm.form,
      formik.values
    )

    if (isStoredSignUpFormDifferentFromFormik) {
      setStoredSignUpForm({
        form: formik.values,
        stepIndex: activeStep,
      })
    }
  }, [activeStep, formik.values, setStoredSignUpForm, storedSignUpForm])

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <Logo extended containerProps={{ mb: 2 }} />
      <Typography
        fontWeight={({ typography }) => typography.fontWeightBold}
        variant='h1'
      >
        Criar conta
      </Typography>

      <Typography variant='body1' color='text.secondary'>
        Encontre a sua próxima jornada!
      </Typography>
      <Alert severity='info'>
        Passo: {activeStep + 1} de {maxSteps}
      </Alert>

      {steps.map((step) => (
        <Fade
          in={steps[activeStep].key === step.key}
          key={step.key}
          enter
          exit={false}
          timeout={{
            enter: 700,
            exit: 0,
          }}
          easing={{
            enter: 'linear',
            exit: 'linear',
          }}
          mountOnEnter
          unmountOnExit
        >
          <Box display='flex' flexDirection='column' gap={3}>
            {steps[activeStep].content}
            <Box display='flex' gap={2} mt={2}>
              {!isFirstStep && (
                <Button
                  variant='outlined'
                  fullWidth
                  type='button'
                  color='black'
                  onClick={handleBack}
                  sx={{ flex: 2 }}
                >
                  Voltar
                </Button>
              )}
              <Button
                ref={ctaButtonRef}
                variant='contained'
                fullWidth
                type={isLastStep ? 'submit' : 'button'}
                color='black'
                onClick={isLastStep ? undefined : handleNext}
                disabled={
                  (isLastStep
                    ? !(formik.isValid && formik.dirty)
                    : formik.values === SIGN_UP_INITIAL_VALUES ||
                      !steps[activeStep].isValid) ||
                  isSigningIn ||
                  isSigningUp
                }
                sx={{ flex: 6 }}
              >
                {isSigningIn
                  ? 'Entrando...'
                  : isSigningUp
                  ? 'Cadastrando...'
                  : isLastStep
                  ? 'Cadastrar'
                  : 'Avançar'}
              </Button>
            </Box>
          </Box>
        </Fade>
      ))}

      <Box
        maxWidth={500}
        display='flex'
        flexDirection='column'
        gap={4}
        margin='0 auto'
        textAlign='center'
      >
        <Typography
          color='text.primary'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          Ja possui uma conta?{' '}
          <Link href={`/${ROUTES.AUTH}/${ROUTES.LOGIN}`} color='inherit'>
            Entre agora
          </Link>
        </Typography>
      </Box>
    </S.Form>
  )
}
