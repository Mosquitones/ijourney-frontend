/* eslint-disable no-useless-escape */
import {
  EMPLOYMENT_TYPE_ENUM,
  EnumValueTypes,
  LOCATION_TYPE_ENUM,
  PHASE_STATUS_TYPE_ENUM,
  VULNERABILITY_ENUM,
} from '@types'
import * as yup from 'yup'

import { PositionRegisterPayloadTypes } from 'services'

const PhaseSchema: yup.ObjectSchema<
  PositionRegisterPayloadTypes['phases'][number]
> = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  sequenceIndex: yup.number().required(),
  phaseStatusType: yup
    .string<EnumValueTypes<typeof PHASE_STATUS_TYPE_ENUM>>()
    .required(),
})

const RequirementSchema: yup.ObjectSchema<
  PositionRegisterPayloadTypes['requirements'][number]
> = yup.object({
  requiredSkillId: yup.number().min(0).required(),
  points: yup.number().min(0).required(),
})

export const PositionModalHandlerSchema: yup.ObjectSchema<PositionRegisterPayloadTypes> =
  yup.object({
    salaryRange: yup.number().min(0).required(),
    title: yup.string().required(),
    shortDescription: yup.string().required(),
    longDescription: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    creationDate: yup.string().required(),
    numOfMaxHiredPeople: yup.number().required(),
    employmentType: yup
      .string<EnumValueTypes<typeof EMPLOYMENT_TYPE_ENUM>>()
      .required(),
    locationType: yup
      .string<EnumValueTypes<typeof LOCATION_TYPE_ENUM>>()
      .required(),
    vulnerabilityList: yup
      .array<EnumValueTypes<typeof VULNERABILITY_ENUM>[]>()
      .required(),
    recruiterId: yup.number().required(),
    phases: yup.array(PhaseSchema).min(1).required(),
    requirements: yup.array(RequirementSchema).required(),
  })
