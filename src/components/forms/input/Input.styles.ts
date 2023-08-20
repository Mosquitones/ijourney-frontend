import { TextField } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const Input = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 0.5rem;

    fieldset {
      border-color: ${({ theme }) => theme.palette.divider};
    }
  }
  .MuiFormHelperText-root {
    margin-left: 0;
  }
`
