import { Drawer as MUIDrawer } from '@mui/material'
import { from } from 'common/theme'
import styled from 'styled-components'

export const Drawer = styled(MUIDrawer)`
  .MuiDrawer-paper {
    width: 100%;

    border: none;
    border-radius: 0;

    /* box-shadow: -2.2rem 1.3rem 3.1rem
      ${({ theme }) => theme.palette.common.black}16; */
  }

  .MuiBackdrop-root {
    backdrop-filter: blur(0.3rem);
  }

  ${from.sm} {
    .MuiDrawer-paper {
      max-width: 50rem;
    }
  }
`
