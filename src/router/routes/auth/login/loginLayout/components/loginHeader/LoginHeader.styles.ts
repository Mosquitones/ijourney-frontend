import { from } from '@eduplaytion/numetry-ui-kit'
import { AppBar, AppBarProps } from '@mui/material'
import styled from 'styled-components'

export const HeaderNumetryStyles = styled(AppBar)<AppBarProps>`
  height: 5.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiAppBar-root {
  }
  background-color: ${({ theme }) => theme.palette.common.white} !important;

  svg {
    height: 5rem;
  }

  ${from.md} {
    height: 7.7rem;
  }
`
