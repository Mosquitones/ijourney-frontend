import { from } from 'common/theme'
import styled from 'styled-components'

export const Form = styled.form`
  position: relative;
  max-width: 60rem;
  width: 80%;
  margin: 7rem auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${from.sm} {
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
  }
`
