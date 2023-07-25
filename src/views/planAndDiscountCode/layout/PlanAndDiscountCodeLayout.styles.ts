import styled from 'styled-components'

export const PlanAndDiscountCodeLayoutStyles = styled.div`
  width: 100%;

  background: ${({ theme }) => theme.palette.common.white};
  border: 0.1rem solid ${({ theme }) => theme.palette.grey.A700};

  display: flex;
  flex-direction: column;

  margin-bottom: 3rem;
`
