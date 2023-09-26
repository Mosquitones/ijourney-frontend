import { InputLabel, TextField } from '@mui/material'
import styled, { css } from 'styled-components'

export const Container = styled.div<{
  fullWidth?: boolean
}>`
  --input-border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`

export const Label = styled(InputLabel)`
  font-weight: ${({ theme }) => theme.typography.fontWeightSemiBold};

  .MuiInputLabel-asterisk {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export const Input = styled(TextField)`
  .MuiInputBase-root {
    border-radius: var(--input-border-radius);

    fieldset {
      border-color: ${({ theme }) => theme.palette.divider};
    }

    input {
      ::placeholder,
      :invalid::-webkit-datetime-edit {
        opacity: 1;
        color: ${({ theme }) => theme.palette.grey[300]};
      }
    }
  }

  .MuiFormHelperText-root {
    margin-left: 0;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  ${({ error }) =>
    error &&
    css`
      input {
        color: ${({ theme }) => theme.palette.error.main};
      }
    `}
`

export const FileButton = styled.button<{ hasFile?: boolean; error?: boolean }>`
  display: flex;

  padding: 0.85rem 1rem 0.8rem 1.2rem;
  min-height: 4rem;
  border-radius: var(--input-border-radius);
  /* border: ${({ theme }) =>
    `0.1rem solid ${theme.palette.common.black}20`}; */
  outline: 0.1rem solid ${({ theme }) => `${theme.palette.common.black}20`};
  border: 0.2rem solid transparent;
  color: ${({ theme }) => theme.palette.grey[300]};
  background-color: transparent;

  :focus {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  transition: all 0.3s;

  :hover {
    outline-color: ${({ theme }) => theme.palette.common.black};
  }

  ${({ hasFile }) =>
    hasFile &&
    css`
      color: ${({ theme }) => theme.palette.common.black};
    `}

  ${({ error }) =>
    error &&
    css`
      &,
      :hover {
        outline-color: ${({ theme }) => theme.palette.error.main};
      }
      :focus {
        border-color: ${({ theme }) => theme.palette.error.main};
      }
    `}
`
