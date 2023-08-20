import { Box } from '@mui/material'
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
