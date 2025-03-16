import { createAuthClient } from 'better-auth/react'
import { getBaseUrl } from '../utils'
import { apiKeyClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    apiKeyClient()
  ]
})
