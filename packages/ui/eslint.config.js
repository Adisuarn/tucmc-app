import baseConfig from '@tucc/eslint-config/base'
import reactConfig from '@tucc/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
]
