import { Table } from '@mui/material'
import { from } from 'common/theme'
import styled from 'styled-components'

export const TableStyles = styled(Table)<{
  headerBgColor?: string | null
}>`
  --padding: 1.6rem 2.4rem;
  --border-width: 0.1rem;
  --border-color: ${({ theme }) => theme.palette.grey[100]};
  --border: var(--border-width) solid var(--border-color);

  --header-background-color: ${({ headerBgColor, theme }) =>
    headerBgColor || theme.palette.common.white};

  --row-contrast-background-color: ${({ theme }) =>
    theme.palette.background.paper};

  width: 100%;

  &,
  thead th,
  tbody td,
  tfoot td,
  caption {
    padding: 0;
    margin: 0;
    border: none;
  }

  thead th,
  tfoot td {
    > :first-child {
      padding: var(--padding);
    }
  }

  caption {
    caption-side: top !important;
    border-bottom: var(--border);
  }

  thead {
    display: none;
    background-color: var(--header-background-color);
    border-bottom: var(--border);

    tr {
      th {
        position: relative;
      }
    }
  }

  tbody {
    tr {
      :not(:first-child),
      :not(:last-child) {
        background-color: ${({ theme }) => theme.palette.common.white};
      }

      :not(:first-child) {
        border-top: var(--border);
      }

      :not(:last-child) {
        border-bottom: var(--border);
      }

      td {
        display: grid;
        grid-template-columns: 20ch auto;
        gap: 2.4rem;
        width: 100%;
        align-items: center;

        :nth-of-type(odd) {
          background-color: var(--row-contrast-background-color);
        }

        ::before {
          content: attr(data-cell);
          padding: var(--padding);

          display: flex;
          align-items: center;

          height: 100%;
          font-weight: ${({ theme }) => theme.typography.fontWeightBold};
          font-size: ${({ theme }) => theme.typography.body1.fontSize};
          text-transform: capitalize;

          position: sticky;
          left: 0;
          z-index: 1;

          border-right: var(--border);

          background-color: var(--header-background-color);
        }
      }
    }
  }

  ${from.md} {
    thead {
      display: table-header-group;

      th {
        :not(:last-child) {
          ::after {
            content: '';
            height: 70%;
            width: var(--border-width);
            background-color: var(--border-color);
            position: absolute;
            left: auto;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    tbody {
      tr {
        :not(:last-child) {
          border-bottom: var(--border);
        }

        :nth-of-type(odd) {
          background-color: var(--row-contrast-background-color);
        }

        & + .sub-component td:only-child {
          padding: 0;
          border-top: var(--border);
          border-bottom: var(--border);
        }

        td {
          padding: var(--padding);

          display: table-cell;
          width: auto;

          :nth-of-type(odd) {
            background-color: transparent;
          }

          ::before {
            display: none;
          }
        }
      }
    }
  }
`
