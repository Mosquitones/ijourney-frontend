import { COLORS, from, heightTo, to } from '@eduplaytion/numetry-ui-kit'
import { BoxProps } from '@mui/material'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const LoginFooterStyles = styled(motion.div)<BoxProps>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 3%;
  ${to.sm} {
    bottom: 1%;
  }
  z-index: 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20rem;

  p {
    color: ${COLORS.white};
    text-transform: uppercase;
    margin-bottom: 0.6rem;
    ${heightTo.sm} {
      display: none;
    }
    ${to.sm} {
      margin-bottom: 0;
    }
  }

  img {
    height: 2.5rem;
    ${from.md} {
      height: 5rem;
    }
  }
`
