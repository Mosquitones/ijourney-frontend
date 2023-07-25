import { COLORS, FONT_WEIGHTS, from, to } from '@eduplaytion/numetry-ui-kit'
import { Divider, DividerProps } from '@mui/material'
import styled from 'styled-components'

export const LoginFormContainerStyles = styled.div`
  position: relative;
  z-index: 100;

  max-width: 90%;
  width: 38rem;
  ${to.md} {
    top: 9%;
  }
`

export const CharactersStyles = styled.img`
  position: absolute;
  top: -17vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  height: 17vh;
  width: auto;
  max-height: 21rem;
  ${from.md} {
    display: none;
  }
`

export const LoginDividerStyles = styled(Divider)<DividerProps>`
  ::before,
  ::after {
    top: 0;
    border-top: 0.1rem solid ${COLORS.lightBlue};
  }

  .MuiDivider-wrapper {
    color: ${COLORS.info};
    font-weight: ${FONT_WEIGHTS.bold};
    text-transform: lowercase;
  }
`

export const LoginFormStyles = styled.div`
  background-color: ${COLORS.white};

  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;

  .MuiButton-root {
    width: 100%;
  }
`
