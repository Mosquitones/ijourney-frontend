import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: inline-flex;

  .MuiCircularProgress-root:first-child {
    position: absolute;
    color: ${({ theme }) => theme.palette.grey.A400};
  }
`

export const LabelContainer = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`
