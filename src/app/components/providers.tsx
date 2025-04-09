'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack'
import { AuthUIProviderTanstack } from '@daveyplate/better-auth-ui/tanstack'
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"
import { ThemeProvider } from 'next-themes'
import { toast } from 'sonner'
import { authClient } from '@/libs/auth/auth-client'

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient()
    }

    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
}

export const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  const queryClient = getQueryClient()
  queryClient.getQueryCache().config.onError = (error, query) => {
    console.error(error, query)
    if (error.message) toast.error(error.message)
  }

  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <AuthUIProviderTanstack
            authClient={authClient}
            credentials={false}
            providers={['google']}
            //eslint-disable-next-line
            navigate={router.push}
            //eslint-disable-next-line
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            LinkComponent={Link}
            settingsUrl="/settings"
            noColorIcons={true}
          >
            {children}
          </AuthUIProviderTanstack>
        </ThemeProvider>
      </AuthQueryProvider>
    </QueryClientProvider>
  )
}
