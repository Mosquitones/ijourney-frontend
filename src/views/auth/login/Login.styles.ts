import { Box, BoxProps, Stack } from '@mui/material'
import { COLORS } from 'common/styles'
import { from } from 'common/theme'
import styled from 'styled-components'

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

export const LoginHeaderStyles = styled(Box)<BoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  border-bottom: 0.27rem solid ${COLORS.secondary};
`
export const FormStackStyles = styled(Stack)`
  a {
    color: ${({ theme }) => theme.palette.info.main};
    text-decoration-color: ${({ theme }) => theme.palette.info.main};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
  }
`
