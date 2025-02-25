import baseConfig, { restrictEnvAccess } from '@tucc/eslint-config/base'
import nextjsConfig from '@tucc/eslint-config/nextjs'
import reactConfig from '@tucc/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
]
