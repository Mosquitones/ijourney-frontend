import { Box, Tab as MUITab, Tabs as MUITabs } from '@mui/material'
import geometricShapes from 'assets/images/app/svg/geometric-shapes.svg'
import styled from 'styled-components'

export const Banner = styled.div`
  position: relative;
  width: 100%;

  background-image: url(${geometricShapes});
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position-x: 63vw;
  background-position-y: 80%;
  background-color: ${({ theme }) => theme.palette.background.paper};

  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.divider};
`

export const Wrapper = styled(Box)`
  padding: 7.2rem 0 3.2rem 0;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const Tabs = styled(MUITabs)`
  margin-bottom: -0.1rem;
  margin-top: 0;
`

export const Tab = styled(MUITab)`
  &.MuiButtonBase-root {
    position: relative;
    padding: 0.8rem 2.4rem !important;

    text-transform: none;

    border: 0.1rem solid transparent;

    transition: all 0.2s ease-in-out;

    font-size: ${({ theme }) => theme.typography.body1.fontSize};

    &.Mui-selected {
      background-color: ${({ theme }) => theme.palette.background.default};

      border: 0.1rem solid ${({ theme }) => theme.palette.divider};
      border-bottom: none;

      text-shadow: 0 0 0.1rem ${({ theme }) => theme.palette.primary.main};

      transition: all 0.2s ease-in-out;

      ::after {
        content: '';
        width: 65%;
        position: absolute;
        margin: 0 auto;
        background-color: ${({ theme }) => theme.palette.primary.main};
        height: 0.3rem;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        border-top-right-radius: 99rem;
        border-top-left-radius: 99rem;

        transition: all 0.2s ease-in-out;
      }
    }
  }
`
