import { Box } from '@mui/material'
import styled from 'styled-components'

export const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
`

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.main};

  width: 3.6rem;
  height: 3.6rem;

  aspect-ratio: 1;

  padding: 1rem;

  border-radius: 0.8rem;
`
