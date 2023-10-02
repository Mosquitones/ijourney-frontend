/* eslint-disable @typescript-eslint/no-unused-vars */
import { MenuItem as MUIMenuItem } from '@mui/material'
import styled, { css } from 'styled-components'

export const MenuItem = styled.li<{ read?: boolean }>`
  padding: 1.2rem 1.6rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  gap: 0.4rem;
  text-align: left !important;
  align-items: flex-start !important;
  cursor: default !important;

  ${({ read }) =>
    read &&
    css`
      .MuiTypography-root {
        opacity: 0.5;
      }
    `}

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
