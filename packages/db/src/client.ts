import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import { env } from '../env'
import * as schema from './schema'

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDrizzle = globalThis as unknown as {
  conn: ReturnType<typeof neon> | undefined
}

const conn = globalForDrizzle.conn ?? neon(env.DATABASE_URL)
if (env.NODE_ENV !== 'production') globalForDrizzle.conn = conn

export const db = drizzle(conn, { schema })
