import { InputBase as MUIInputBase, Paper as MUIPaper } from '@mui/material'
import { from, to } from 'common/theme'
import styled from 'styled-components'

export const Paper = styled(MUIPaper)`
  display: flex;
  flex-direction: column;

  ${from.sm} {
    flex-direction: row;
    box-shadow: 0 1rem 1.6rem ${({ theme }) => theme.palette.common.black}12 !important;
  }

  ${to.sm} {
    .MuiButtonBase-root {
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    }
  }
`
export const InputBase = styled(MUIInputBase)`
  gap: 0.8rem;
  width: 100%;

  .MuiInputBase-input {
    ::placeholder {
      color: ${({ theme }) => theme.palette.text.secondary};
    }
  }
`
