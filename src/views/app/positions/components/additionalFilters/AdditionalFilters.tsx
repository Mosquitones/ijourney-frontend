/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
} from '@mui/material'

export const AdditionalFilters: React.FC = () => {
  return (
    <Box display='flex' flexDirection='column' gap={3}>
      <FormControl fullWidth component='fieldset'>
        <FormLabel component='legend'>Data de postagem</FormLabel>
        <OutlinedInput
          type='date'
          name='date-posting'
          placeholder='Qualquer período'
        />
        {false && <FormHelperText>Helper Text</FormHelperText>}
      </FormControl>

      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Tipo do trabalho</FormLabel>
        <FormGroup>
          {['Integral', 'Estágio', 'Freelance', 'Voluntário'].map(
            (option, i) => (
              <FormControlLabel
                key={option}
                control={<Checkbox checked={i === 0} name={option} />}
                label={option}
                sx={{ ml: 0, gap: 1 }}
              />
            )
          )}
          {false && <FormHelperText>Helper Text</FormHelperText>}
        </FormGroup>
      </FormControl>

      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Salário</FormLabel>
        <RadioGroup
          // aria-labelledby='demo-radio-buttons-group-label'
          // defaultValue='female'
          name='radio-buttons-group'
        >
          {['Menos de 1K', '1K até 5K', '2.5K até 5K', 'Customizado'].map(
            (option, i) => (
              <FormControlLabel
                key={option}
                checked={i === 3}
                value={option}
                control={<Radio />}
                label={option}
                sx={{ mt: -1 }}
              />
            )
          )}
        </RadioGroup>
        <Slider
          getAriaLabel={() => 'Salary range'}
          // value={value}
          defaultValue={30}
          // onChange={handleChange}
          valueLabelDisplay='auto'
          // getAriaValueText={valuetext}
        />
        {false && <FormHelperText>Helper Text</FormHelperText>}
      </FormControl>

      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Modelo de Contratação</FormLabel>
        <FormGroup>
          {['Presencial', 'Híbrido', 'Remoto'].map((option, i) => (
            <FormControlLabel
              key={option}
              control={<Checkbox checked={i === 0} name={option} />}
              label={option}
              sx={{ ml: 0, gap: 1 }}
            />
          ))}
        </FormGroup>
        {false && <FormHelperText>Helper Text</FormHelperText>}
      </FormControl>

      <Divider />

      <FormControl fullWidth component='fieldset' variant='standard'>
        <FormLabel component='legend'>Função de Trabalho</FormLabel>
        <FormGroup>
          {['Análise', 'Gestão', 'Relações públicas'].map((option, i) => (
            <FormControlLabel
              key={option}
              control={<Checkbox checked={i === 0} name={option} />}
              label={option}
              sx={{ ml: 0, gap: 1 }}
            />
          ))}
        </FormGroup>
        {false && <FormHelperText>Helper Text</FormHelperText>}
      </FormControl>
    </Box>
  )
}
