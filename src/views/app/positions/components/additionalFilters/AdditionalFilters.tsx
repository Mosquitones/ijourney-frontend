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
  LOCATION_TYPE_LIST,
  VULNERABILITIES_LIST,
} from '@types'
import { useQuery } from 'react-query'
import { renderSelectedCheckbox } from 'views/auth'

import { Input } from 'components'
import { useAuth } from 'contexts'
import { useDebounce, useParamsSelector, useSkills } from 'hooks'
import { PositionPayloadQueryTypes, SkillServices } from 'services'
import { currencyFormatter } from 'utils'

type Filters = keyof PositionPayloadQueryTypes

// 'position-name': string
// 'city-or-state-name': string

const MAX_SALARY_VALUE = 10000
const INITIAL_SALARY_VALUE: [number, number] = [0, MAX_SALARY_VALUE]
const SALARIES_LIST = [
  {
    id: 0,
    label: 'Todos os salários',
    value: INITIAL_SALARY_VALUE,
  },
  {
    id: 1,
    label: 'Até 1K',
    value: [0, 1000],
  },
  {
    id: 2,
    label: '1K até 5K',
    value: [1000, 5000],
  },
  {
    id: 3,
    label: '2.5K até 5K',
    value: [2500, 5000],
  },
  {
    id: -1,
    label: 'Customizado',
    value: [2500, 7000],
  },
] as const

export const AdditionalFilters: React.FC = () => {
  const { isUserRole } = useAuth()
  const params = useParamsSelector<Filters | 'salary-id'>()

  const skillsQuery = useSkills()

  const [salary, setSalary] = React.useState<number[]>(INITIAL_SALARY_VALUE)
  const minCreationDateParam = params.get('min-creation-date')
  const maxCreationDateParam = params.get('max-creation-date')

  const salaryIdParam = Number(
    params.get('salary-id') || 0
  ) as (typeof SALARIES_LIST)[number]['id']
  const minSalaryParam = Number(params.get('min-salary') || 0)
  const maxSalaryParam = Number(params.get('max-salary') || 0)

  const debouncedSalary = useDebounce(salary, 500)

  const employmentTypeParam = params.getAsArray('employment-type')
  const locationTypeParam = params.getAsArray('location-type')
  const skillIdsParam = params.getAsArray('skill-ids')

  const vulnerabilitiesParam = params.getAsArray('vulnerabilities')

  const selectedVulnerabilityList = useMemo(
    () =>
      VULNERABILITIES_LIST.filter((vulnerability) =>
        vulnerabilitiesParam.includes(vulnerability.value)
      ),
    [vulnerabilitiesParam]
  )

  const selectedSkillsList = useMemo(
    () =>
      skillsQuery.data?.filter((skill) =>
        skillIdsParam.includes(String(skill.id))
      ) || [],
    [skillIdsParam]
  )

  const selectedSalary = useMemo(
    () =>
      SALARIES_LIST.find((salary) => salary.id === salaryIdParam) ||
      SALARIES_LIST[0],
    [salaryIdParam]
  )

  useEffect(() => {
    const [minSalary, maxSalary] = salary

    if (salary !== INITIAL_SALARY_VALUE) {
      params.add({
        key: 'min-salary',
        value: String(minSalary),
      })

      params.add({
        key: 'max-salary',
        value: String(maxSalary),
      })
    } else {
      params.delete('min-salary')
      params.delete('max-salary')
    }
  }, [debouncedSalary])

  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <FormControl fullWidth component='fieldset'>
        <FormLabel component='legend'>Data de postagem (inicial)</FormLabel>
        <OutlinedInput
          value={minCreationDateParam}
          name='min-creation-date'
          type='date'
          placeholder='Qualquer período'
          onChange={(e) => {
            if (e.target.value) {
              params.add({ key: 'min-creation-date', value: e.target.value })
            } else {
              params.delete('min-creation-date')
              params.delete('max-creation-date')
            }
          }}
        />
        {false && <FormHelperText>Helper Text</FormHelperText>}
      </FormControl>

      {minCreationDateParam && (
        <FormControl
          fullWidth
          component='fieldset'
          error={!maxCreationDateParam}
        >
          <FormLabel component='legend'>Data de postagem (final)</FormLabel>
          <OutlinedInput
            value={maxCreationDateParam}
            type='date'
            name='max-creation-date'
            placeholder='Qualquer período'
            onChange={(e) => {
              if (e.target.value) {
                params.add({ key: 'max-creation-date', value: e.target.value })
              } else {
                params.delete('max-creation-date')
              }
            }}
            inputProps={{ min: minCreationDateParam }}
          />
          {!maxCreationDateParam && (
            <FormHelperText>Obrigatório ter uma data máxima</FormHelperText>
          )}
        </FormControl>
      )}

      <Divider />

      {!isUserRole.CANDIDATE && (
        <>
          <Autocomplete
            id='vulnerabilities-autocomplete-box'
            multiple
            value={selectedVulnerabilityList}
            options={VULNERABILITIES_LIST}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.value}>
                {renderSelectedCheckbox(selected)}
                {option.label}
              </li>
            )}
            noOptionsText='Vulnerabilidade não encontrada'
            onChange={(_, vulnerabilities) => {
              const vulnerabilitiesList = vulnerabilities.flatMap(
                (vulnerability) => vulnerability.value
              )
              params.add({
                key: 'vulnerabilities',
                value: vulnerabilitiesList,
              })
            }}
            renderInput={(params) => (
              <Input
                {...params}
                label={
                  <FormLabel {...params?.InputLabelProps} component='legend'>
                    Tipo de vulnerabilidade social
                  </FormLabel>
                }
                placeholder='Clique para selecionar'
              />
            )}
          />
          <Divider />
        </>
      )}

      <Autocomplete
        id='skills-autocomplete-box'
        multiple
        value={selectedSkillsList}
        options={skillsQuery.data || []}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option.id}>
            {renderSelectedCheckbox(selected)}
            {option.name}
          </li>
        )}
        noOptionsText='Habilidade e/ou tecnologia não encontrada'
        onChange={(_, skills) => {
          const skillIds = skills.flatMap((skill) => String(skill.id))
          params.add({
            key: 'skill-ids',
            value: skillIds,
          })
        }}
        renderInput={(params) => (
          <Input
            {...params}
            label={
              <FormLabel {...params?.InputLabelProps} component='legend'>
                Habilidades e/ou tecnologias
              </FormLabel>
            }
            placeholder='Selecione'
          />
        )}
      />
      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Tipo de contratação</FormLabel>
        <FormGroup>
          {EMPLOYMENT_TYPE_LIST.map((employmentType, i) => (
            <FormControlLabel
              key={employmentType.key}
              value={employmentType.key}
              control={
                <Checkbox
                  checked={employmentTypeParam.includes(employmentType.key)}
                  name={employmentType.label}
                  onChange={(_, isChecked) => {
                    if (isChecked) {
                      params.add({
                        key: 'employment-type',
                        value: [...employmentTypeParam, employmentType.key],
                      })
                    } else {
                      params.add({
                        key: 'employment-type',
                        value: employmentTypeParam.filter(
                          (employmentKey) =>
                            employmentKey !== employmentType.key
                        ),
                      })
                    }
                  }}
                />
              }
              label={employmentType.label}
              sx={{ ml: 0, gap: 1 }}
            />
          ))}
          {false && <FormHelperText>Helper Text</FormHelperText>}
        </FormGroup>
      </FormControl>

      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Salário</FormLabel>
        <RadioGroup
          value={selectedSalary.id}
          onChange={(_, optionSalaryId) => {
            params.add({
              key: 'salary-id',
              value: optionSalaryId,
            })

            const optionSalaryIdAsNumber = Number(
              optionSalaryId
            ) as (typeof SALARIES_LIST)[number]['id']

            const salary = SALARIES_LIST.find(
              (option) => option.id === optionSalaryIdAsNumber
            )

            if (!salary) return

            setSalary(salary.value as [number, number])
          }}
          name='radio-buttons-group'
        >
          {SALARIES_LIST.map((optionSalary) => (
            <FormControlLabel
              key={optionSalary.id}
              checked={optionSalary.id === selectedSalary?.id}
              value={optionSalary.id}
              control={<Radio />}
              label={optionSalary.label}
              sx={{ mt: -1 }}
            />
          ))}
        </RadioGroup>
        {selectedSalary?.id === -1 && (
          <Slider
            max={MAX_SALARY_VALUE}
            getAriaLabel={() => 'Distância entre salários para filtrar'}
            valueLabelFormat={(value) => currencyFormatter.format(value)}
            value={salary}
            onChange={(_, value) => {
              setSalary(value as [number, number])
            }}
            valueLabelDisplay='auto'
            disableSwap
          />
        )}
        {false && <FormHelperText>Helper Text</FormHelperText>}
      </FormControl>

      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Modelo de trabalho</FormLabel>
        <FormGroup>
          {LOCATION_TYPE_LIST.map((locationType, i) => (
            <FormControlLabel
              key={locationType.key}
              value={locationType.key}
              control={
                <Checkbox
                  checked={locationTypeParam.includes(locationType.key)}
                  name={locationType.label}
                  onChange={(_, isChecked) => {
                    if (isChecked) {
                      params.add({
                        key: 'location-type',
                        value: [...locationTypeParam, locationType.key],
                      })
                    } else {
                      params.add({
                        key: 'location-type',
                        value: locationTypeParam.filter(
                          (locationTypekey) =>
                            locationTypekey !== locationType.key
                        ),
                      })
                    }
                  }}
                />
              }
              label={locationType.label}
              sx={{ ml: 0, gap: 1 }}
            />
          ))}
          {false && <FormHelperText>Helper Text</FormHelperText>}
        </FormGroup>
      </FormControl>
    </Box>
  )
}
