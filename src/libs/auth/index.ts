import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { apiKey } from "better-auth/plugins"
import { headers } from 'next/headers'

import { env } from '@/env'
import { db } from '@/server/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }
  },
  plugins: [
    nextCookies(),
    apiKey(),
  ]
})

export const getSession = async() => await auth.api.getSession({
  headers: await headers()
})
