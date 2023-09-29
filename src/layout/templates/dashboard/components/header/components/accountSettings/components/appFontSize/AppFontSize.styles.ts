import { ButtonGroup as MUIButtonGroup } from '@mui/material'
import styled from 'styled-components'

import { Button as MyButton } from 'components'

export const ButtonGroup = styled(MUIButtonGroup)`
  .MuiButtonBase-root {
    border: 0.1rem solid ${({ theme }) => theme.palette.divider};
    padding: 0;
    :hover {
      border-color: ${({ theme }) => theme.palette.primary.main};
    }
    :disabled {
      opacity: 0.5;
    }

    :not(:first-child, :last-child) {
      opacity: 1;
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`
export const Button = styled(MyButton)`
  border: none;
`
