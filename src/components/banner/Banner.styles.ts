/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Tab as MUITab, Tabs as MUITabs } from '@mui/material'
import geometricShapes from 'assets/images/app/svg/geometric-shapes.svg'
import styled, { css } from 'styled-components'

const getEncodedURL = (primaryColor: string, primaryOpacityColor: string) =>
  `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='850.063' height='210.88' viewBox='0 0 850.063 210.88'%3E%3Cdefs%3E%3Cstyle%3E .cls-1, .cls-3, .cls-4, .cls-5 %7B fill: none; %7D .cls-2 %7B isolation: isolate; clip-path: url(%23clip-path); %7D .cls-3 %7B stroke: ${encodeURIComponent(
    primaryColor
  )}; stroke-width: 101px; %7D .cls-4 %7B stroke: ${encodeURIComponent(
    primaryOpacityColor
  )}; %7D .cls-4, .cls-5 %7B stroke-width: 113px; %7D .cls-5 %7B stroke: %23000; %7D %3C/style%3E%3CclipPath id='clip-path'%3E%3Crect class='cls-1' y='96' width='850.063' height='210.88'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg id='Scroll_Group_3' data-name='Scroll Group 3' class='cls-2' transform='translate(0 -96)'%3E%3Cg id='Group_338' data-name='Group 338' transform='translate(-1070.856 -297.16)'%3E%3Cpath id='Path_134' data-name='Path 134' class='cls-3' d='M3085.206,485.486,3268.6,384.547' transform='translate(-2010.938 479.596) rotate(-9)'/%3E%3Cpath id='Path_135' data-name='Path 135' class='cls-4' d='M3446.737,656.307l336.313-215.035-140.833-93.185' transform='translate(-1990)'/%3E%3Cpath id='Path_136' data-name='Path 136' class='cls-5' d='M3376.21,358.414l-10.075-21.048,92.7,98.1-143.363,118.06,114.364,136.868L3755.9,544.638l194.59,132.889' transform='translate(-1996.706)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A"`

export const Banner = styled.div`
  position: relative;
  width: 100%;

  ${({ theme }) =>
    theme.palette.primary.main &&
    theme.palette.primary[200] &&
    css`
      background-image: url(${getEncodedURL(
        theme.palette.primary.main,
        theme.palette.primary[200]
      )});
    `}

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
