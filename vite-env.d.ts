/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv extends NodeJS.ProcessEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
