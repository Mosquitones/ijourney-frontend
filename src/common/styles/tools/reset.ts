import { css } from 'styled-components'

export const genericReset = () => css`
  * {
    --animation-duration: 0.3s;
    --animation-timing-function: ease-in-out;

    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
      `${theme.palette.grey.A700} ${theme.palette.common.white}`};

    transition: fill var(--animation-duration) var(--animation-timing-function),
      color var(--animation-duration) var(--animation-timing-function),
      background-color var(--animation-duration)
        var(--animation-timing-function),
      border-color var(--animation-duration) var(--animation-timing-function),
      box-shadow var(--animation-duration) var(--animation-timing-function);
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
      /* input,
      textarea,
      button,
      .MuiAccordion-root,
      .MuiSelect-select, */
      [tabindex='-1']
    ):focus {
    --line-width: 0.2rem;

    z-index: 1;
    outline: var(--line-width) solid ${({ theme }) => theme.palette.info.main} !important;
    outline-offset: calc(var(--line-width) * -1);
    /* outline-offset: var(--line-width); */
    /* border-radius: 0.5rem; */
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'cv11', 'salt', 'ss01', 'ss03', 'cv01', 'cv02',
      'cv03', 'cv04', 'cv05', 'cv06', 'cv09', 'cv10';

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

  .MuiTabPanel-root {
    padding: 0 !important;
  }
`
