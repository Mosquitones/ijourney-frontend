/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from 'react'

import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
} from '@mui/material'
import {
  EMPLOYMENT_TYPE_LIST,
  GENDER_LIST,
  LOCATION_TYPE_LIST,
  VULNERABILITIES_LIST,
} from '@types'
import { useQuery } from 'react-query'
import { renderSelectedCheckbox } from 'views/auth'

import { Input } from 'components'
import { useAuth } from 'contexts'
import { useDebounce, useParamsSelector, useSkills } from 'hooks'
import {
  CandidatePayloadQueryTypes,
  PositionPayloadQueryTypes,
  RecruiterPayloadQueryTypes,
  SkillServices,
  SkillTypes,
} from 'services'
import { currencyFormatter } from 'utils'

type Filters = keyof RecruiterPayloadQueryTypes

const MAX_AGE_VALUE = 100
const INITIAL_AGE_VALUE: [number, number] = [0, MAX_AGE_VALUE]

// 'min-age': number
// 'max-age': number
// genders: EnumValueTypes<typeof GENDER_ENUM>[]
// vulnerabilities: EnumValueTypes<typeof VULNERABILITY_ENUM>[]
// 'skill-ids': SkillTypes['id'][]

export const RecruiterFilters: React.FC = () => {
  const { isUserRole } = useAuth()
  const params = useParamsSelector<Filters>()

  const [age, setAge] = React.useState<number[]>(INITIAL_AGE_VALUE)

  const debouncedAge = useDebounce(age, 500)

  const gendersParam = params.getAsArray('genders')

  // const selectedVulnerabilityList = useMemo(
  //   () =>
  //     VULNERABILITIES_LIST.filter((vulnerability) =>
  //       vulnerabilitiesParam.includes(vulnerability.value)
  //     ),
  //   [vulnerabilitiesParam]
  // )

  // const selectedSkillsList = useMemo(
  //   () =>
  //     skills.filter((skill) => skillIdsParam.includes(String(skill.id))) || [],
  //   [skillIdsParam]
  // )

  const selectedGenders = useMemo(
    () => GENDER_LIST.filter((gender) => gendersParam.includes(gender.value)),
    [gendersParam]
  )

  useEffect(() => {
    const [minAge, maxAge] = age

    if (age !== INITIAL_AGE_VALUE) {
      params.add({
        key: 'min-age',
        value: String(minAge),
      })

      params.add({
        key: 'max-age',
        value: String(maxAge),
      })
    } else {
      params.delete('min-age')
      params.delete('max-age')
    }
  }, [debouncedAge])

  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <Autocomplete
        id='genders-autocomplete-box'
        multiple
        value={selectedGenders}
        options={GENDER_LIST}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.value}>
            {renderSelectedCheckbox(selected)}
            {option.label}
          </li>
        )}
        noOptionsText='Gênero não encontrado'
        onChange={(_, genders) => {
          const genderList = genders.flatMap((gender) => gender.value)
          params.add({
            key: 'genders',
            value: genderList,
          })
        }}
        renderInput={(params) => (
          <Input
            {...params}
            label={
              <FormLabel {...params?.InputLabelProps} component='legend'>
                Gênero
              </FormLabel>
            }
            placeholder='Clique para selecionar'
          />
        )}
      />

      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Idade</FormLabel>
        <Slider
          min={0}
          max={MAX_AGE_VALUE}
          getAriaLabel={() => 'Distância entre idades para filtrar'}
          value={age}
          onChange={(_, value) => {
            setAge(value as [number, number])
          }}
          valueLabelDisplay='auto'
          disableSwap
        />
        {false && <FormHelperText>Helper Text</FormHelperText>}
      </FormControl>
    </Box>
  )
}
