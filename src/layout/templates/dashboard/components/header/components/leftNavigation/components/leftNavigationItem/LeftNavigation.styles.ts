import { NavLink as RouterNavLink } from 'react-router-dom'
import styled from 'styled-components'

export const NavLink = styled(RouterNavLink)`
  :focus-within {
    .MuiListItemButton-root {
      outline: 0.2rem solid ${({ theme }) => theme.palette.info.main} !important;
      outline-offset: -0.2rem;
      box-shadow: none;
    }
  }
`
