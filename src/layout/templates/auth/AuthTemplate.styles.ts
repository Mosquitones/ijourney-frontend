import { Box } from '@mui/material'
import { from } from 'common/theme'
import styled from 'styled-components'

export const AuthTemplate = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.palette.background.default};

  ${from.sm} {
    flex-direction: row;
  }
`

export const Content = styled(Box)`
  position: relative;

  img {
    position: relative;

    &#top-img {
      z-index: 0;
      width: 100%;
      object-fit: cover;
      max-height: 60vh;
      top: 0;
      bottom: 'auto';
    }

    &#bottom-left-img {
      z-index: 1;
      top: 'auto';
      bottom: 0;
      left: 0;
      width: 20vw;
    }
  }

  ${from.sm} {
    /* flex: 1; */
    height: 100vh;

    img {
      position: absolute;
    }
  }
`

export const TextBox = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  /* border: 1px solid red; */
  gap: 2rem;

  position: absolute;
  /* z-index: -1; */
  bottom: 0;
  z-index: 1;
  width: 100%;

  padding: 4rem 3rem;

  background-color: ${({ theme }) => theme.palette.background.paper};

  /* right: 3vw; */

  /* width: 100ch; */

  /* max-width: 65%; */

  ${from.sm} {
    gap: 3rem;
    /* position: absolute; */
    z-index: 0;
    bottom: 17vh;
    padding: 2vw 2vw 2vw 15vw;
  }
`
