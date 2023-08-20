import { css } from 'styled-components'

export const genericReset = () => css`
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
      `${theme.palette.grey.A700} ${theme.palette.common.white}`};
  }

  *::-webkit-scrollbar {
    width: 1.7rem;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 1.2rem;
    border: 0.4rem solid transparent;
    background-color: ${({ theme }) => theme.palette.grey.A700};
    background-clip: content-box;
    transition: 0.3s;
  }

  * {
    &,
    &:before,
    &:after {
      box-sizing: border-box;
      outline: none;
      text-transform: none;
      font-family: ${({ theme }) => theme.typography.fontFamily};
      font-size: ${({ theme }) => theme.typography.body1.fontSize};
    }
  }

  *:not(
      input,
      textarea,
      button,
      .MuiAccordion-root,
      .MuiSelect-select,
      [tabindex='-1']
    ):focus {
    --line-width: 0.2rem;
    outline: var(--line-width) solid ${({ theme }) => theme.palette.info.main} !important;
    outline-offset: calc(var(--line-width) * -1);
    box-shadow: none;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockquote,
  p,
  pre,
  dl,
  dd,
  ol,
  ul,
  figure,
  hr,
  fieldset,
  legend {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 62.5%;
  }

  body {
    background-color: ${({ theme }) => theme.palette.background?.default};
  }

  li > {
    ol,
    ul {
      margin-bottom: 0;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset {
    min-width: 0;
    border: 0;
  }

  button {
    cursor: pointer;
  }

  a,
  li {
    text-decoration: none;
  }

  a {
    color: inherit;
  }

  img {
    width: 100%;
    max-width: 100%;
  }
`
