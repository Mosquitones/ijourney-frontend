import { COLORS, from, GameBackgroundPNG } from '@eduplaytion/numetry-ui-kit'
import { Box } from '@mui/material'
import styled from 'styled-components'

export const LoginWrapperStyles = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100vw;
  position: relative;

  background-color: ${COLORS.dark};
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  ${from.sm} {
    overflow-y: hidden;
  }
`

export const CharactersStyles = styled(Box)`
  width: 100%;
  height: auto;
  min-height: 60vh;
  background-color: ${COLORS.secondary};
  background-size: cover;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  img {
    transform: translateX(28vw);
    display: none;
  }

  ${from.md} {
    background-image: url(${GameBackgroundPNG});
    img {
      width: auto;
      height: 40vh;
      max-height: 45rem;
      display: block;
    }
  }
`
