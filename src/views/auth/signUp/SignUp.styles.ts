import styled from 'styled-components'

import { from } from 'utils'

export const Form = styled.form`
  position: relative;
  max-width: 50rem;
  width: 80%;
  margin: 7rem auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${from.sm} {
    margin: 0 auto;
    /* padding: 4.8rem 0; */
    top: 50%;
    transform: translateY(-50%);
  }
`
