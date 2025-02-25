import { db } from "@tucc/db/client";
import { oAuthProxy } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env";

export const config = {
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  secret: env.AUTH_SECRET,
  plugins: [oAuthProxy(), nextCookies()],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }, 
  }
} satisfies BetterAuthOptions

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session
