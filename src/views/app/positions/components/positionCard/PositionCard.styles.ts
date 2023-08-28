import { Paper as MUIPaper, Button as MuiButton } from '@mui/material'
import { from } from 'common/theme'
import styled from 'styled-components'

export const Button = styled(MuiButton)`
  padding: 0 !important;
  text-align: left;
`

export const Paper = styled(MUIPaper)`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  gap: 1.6rem;
  width: 100%;
`

export const Header = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  flex-direction: column;

  ${from.md} {
    flex-direction: row;
  }
`

export const HeaderInfoContent = styled.div`
  display: flex;
  gap: 0.8rem;

  ${from.xs} {
    flex-direction: column;
  }

  ${from.sm} {
    flex-direction: row;
    justify-content: space-between;
  }

  ${from.md} {
    flex-direction: column;
    justify-content: initial;
    align-items: flex-end;
  }
`

export const Body = styled.div``
