import styled, { css } from 'styled-components'

export const Header = styled.header<{ showOnScroll?: boolean }>`
  position: sticky;
  top: -7.2rem;

  z-index: ${({ theme }) => theme.zIndex.appBar};
  background-color: ${({ theme }) => theme.palette.background.default};
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.divider};

  transition: all 0.2s ease-in-out;

  ${({ showOnScroll }) =>
    showOnScroll &&
    css`
      top: 0;
    `}
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
`

export const NavLinkItem = styled.div<{ isActive: boolean }>`
  position: relative;
  padding: 2.4rem;

  p {
    color: ${({ theme }) => theme.palette.text.secondary};

    transition: all 0.2s ease-in-out;
  }

  :hover {
    background-color: ${({ theme }) => theme.palette.grey[50]};
  }

  transition: all 0.2s ease-in-out;

  ${({ isActive }) =>
    isActive &&
    css`
      p {
        text-shadow: 0 0 0.1rem ${({ theme }) => theme.palette.primary.main};
        color: ${({ theme }) => theme.palette.primary.main};
      }

      ::before {
        content: '';
        position: absolute;
        margin: 0 auto;
        background-color: ${({ theme }) => theme.palette.primary.main};
        height: 0.2rem;
        top: auto;
        left: 0;
        right: 0;
        bottom: 0;
        border-top-right-radius: 99rem;
        border-top-left-radius: 99rem;
      }
    `}
`
