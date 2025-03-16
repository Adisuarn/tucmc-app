'use client'

import type { QueryClient } from '@tanstack/react-query'
import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { createQueryClient } from '@/libs/api/query-client'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { authClient } from '@/libs/auth/auth-client'
import Link from 'next/link'

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  else return (clientQueryClientSingleton ??= createQueryClient())
}

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  const router = useRouter()
  const queryClient = getQueryClient()

  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <AuthUIProvider
          authClient={authClient}
          credentials={false}
          providers={["google"]}
          //eslint-disable-next-line
          navigate={router.push}
          //eslint-disable-next-line
          replace={router.replace}
          onSessionChange={() => router.refresh()}
          //@ts-expect-error - Link is not assignable to React.ComponentType
          LinkComponent={Link}
          settingsUrl='/settings'
        >
          {children}
        </AuthUIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
