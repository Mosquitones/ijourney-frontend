/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react'

import {
  Autocomplete,
  Box,
  Dialog,
  DialogContent,
  Divider,
} from '@mui/material'
import { EMPLOYMENT_TYPE_LIST, LOCATION_TYPE_LIST } from '@types'
import { useFormik } from 'formik'

import { Button, DialogTitleComponent, Input } from 'components'
import { useAuth } from 'contexts'
import { PositionRegisterPayloadTypes } from 'services'

import { PositionModalHandlerPropTypes } from './PositionModalHandler.types'

export const PositionModalHandler: React.FC<PositionModalHandlerPropTypes> = ({
  position,
  ...rest
}) => {
  const { userId } = useAuth()
  const action = `${position ? 'Editar' : 'Criar'} vaga`

  const formik = useFormik<PositionRegisterPayloadTypes>({
    initialValues: {
      title: '',
      shortDescription: '',
      longDescription: '',
      salaryRange: 0,
      city: '',
      state: '',
      employmentType: null,
      locationType: null,
      numOfHiredPeople: 0,
      phases: [],
      requirements: [],
      creationDate: new Date().toLocaleDateString(),
      recruiterId: userId,
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const selectedEmploymentType = useMemo(
    () =>
      EMPLOYMENT_TYPE_LIST.find(
        (where) => where.key === formik.values.employmentType
      ),
    [formik.values.employmentType]
  )

  const selectedLocationType = useMemo(
    () =>
      LOCATION_TYPE_LIST.find(
        (where) => where.key === formik.values.locationType
      ),
    [formik.values.locationType]
  )

  return (
    <Dialog {...rest} fullWidth maxWidth='md' scroll='paper'>
      <DialogTitleComponent
        title={action}
        onClose={() => {
          rest.onClose?.({}, 'backdropClick')
        }}
      />
      <Divider />

      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        py={3}
        px={2}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Input
          {...formik.getFieldProps('title')}
          label='Título da vaga'
          required
        />
        <Input
          {...formik.getFieldProps('shortDescription')}
          inputProps={{ maxLength: 150 }}
          label='Descrição curta'
          required
        />
        <Input
          {...formik.getFieldProps('longDescription')}
          multiline
          rows={10}
          label='Descrição completa'
          required
        />
        <Input
          {...formik.getFieldProps('city')}
          label='Qual a cidade?'
          required
        />
        <Input
          {...formik.getFieldProps('state')}
          label='Qual o estado?'
          required
        />
        <Input
          {...formik.getFieldProps('salaryRange')}
          type='number'
          label='Qual o salário ofertado?'
          required
        />
        <Input
          {...formik.getFieldProps('numOfHiredPeople')}
          type='number'
          label='Quantas pessoas podem ser contratadas?'
          required
        />

        <Autocomplete
          id='employment-type-autocomplete-box'
          autoHighlight
          disablePortal
          fullWidth
          value={selectedEmploymentType}
          inputValue={selectedEmploymentType?.label}
          onKeyPress={handleOnKeyPress}
          options={EMPLOYMENT_TYPE_LIST}
          getOptionLabel={(option) => option.label}
          onChange={(_, employmentType) => {
            if (employmentType) {
              formik.setFieldValue('employmentType', employmentType.key)
            }
          }}
          onBlur={(e) => formik.handleBlur('employmentType')(e)}
          renderInput={(params) => {
            params.id = 'employmentType'

            return (
              <Input
                {...params}
                name={params.id}
                error={
                  formik.touched.employmentType &&
                  !!formik.errors.employmentType
                }
                helperText={
                  formik.touched.employmentType
                    ? formik.errors.employmentType
                    : undefined
                }
                label='Qual o tipo de contratação?'
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
          id='location-type-autocomplete-box'
          autoHighlight
          disablePortal
          fullWidth
          value={selectedLocationType}
          inputValue={selectedLocationType?.label}
          onKeyPress={handleOnKeyPress}
          options={LOCATION_TYPE_LIST}
          getOptionLabel={(option) => option.label}
          onChange={(_, locationType) => {
            if (locationType) {
              formik.setFieldValue('locationType', locationType.key)
            }
          }}
          onBlur={(e) => formik.handleBlur('locationType')(e)}
          renderInput={(params) => {
            params.id = 'locationType'

            return (
              <Input
                {...params}
                name={params.id}
                error={
                  formik.touched.locationType && !!formik.errors.locationType
                }
                helperText={
                  formik.touched.locationType
                    ? formik.errors.locationType
                    : undefined
                }
                label='Qual o modelo de trabalho?'
                placeholder='Selecione'
                InputLabelProps={{
                  ...params.InputLabelProps,
                  required: true,
                }}
              />
            )
          }}
        />
      </Box>

      <Box position='sticky' bottom={0} bgcolor='white'>
        <Divider />
        <DialogContent
          sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
        >
          <Button variant='outlined' color='black' type='reset'>
            Apagar
          </Button>
          <Button variant='contained' color='black' type='submit'>
            {action}
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
