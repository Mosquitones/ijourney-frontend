import { MenuItem as MUIMenuItem } from '@mui/material'
import styled from 'styled-components'

export const MenuItem = styled(MUIMenuItem)`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left !important;
  align-items: flex-start !important;
  cursor: default !important;

  .MuiButtonBase-root {
    position: absolute;
    right: 0;
    opacity: 0;

    transition: all 0.2s;
  }

  .MuiTypography-caption {
    opacity: 1;

    transition: all 0.2s;
  }

  transition: all 0.2s;

  :hover {
    .MuiBox-root {
      .MuiTypography-caption {
        opacity: 0;
      }

      .MuiButtonBase-root {
        opacity: 1;
      }
    }
  }
`
