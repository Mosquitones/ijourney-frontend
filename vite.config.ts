import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'

const srcPath = path.resolve('./src')

const absolutePathAliases = fs
  .readdirSync(srcPath, { withFileTypes: true })
  .map((dirent) => dirent.name.replace(/(\.ts)x?$/, ''))
  .reduce<Record<string, string>>(
    (aliases, directory) => ({
      ...aliases,
      [directory]: path.join(srcPath, directory),
    }),
    {}
  )

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    envPrefix: 'VITE_',
    plugins: [react(), svgr(), eslint()],
    server: {
      host: true,
      port: Number(env.PORT) || 3000,
    },
    assetsInclude: ['**/*.md'],
    resolve: {
      alias: absolutePathAliases,
    },
  }
})
