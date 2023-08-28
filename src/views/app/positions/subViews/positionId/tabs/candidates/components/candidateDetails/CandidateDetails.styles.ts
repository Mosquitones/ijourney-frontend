import { Drawer as MUIDrawer } from '@mui/material'
import { from } from 'common/theme'
import styled from 'styled-components'

export const Drawer = styled(MUIDrawer)`
  .MuiDrawer-paper {
    width: 100%;

    border: none;
    border-radius: 0;
  }

  .MuiBackdrop-root {
    backdrop-filter: blur(0.3rem);
  }

  ${from.sm} {
    .MuiDrawer-paper {
      max-width: 45rem;
    }
  }
`
