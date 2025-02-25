import { Suspense } from 'react'
import { Typography } from '@tucc/ui/typography'
import { AuthShowcase } from '@components/auth-showcase'
import { ThemeBtn } from '@components/theme-btn'
import { HydrateClient, trpc, getQueryClient } from '@/lib/trpc/server'
import { TRPCError } from '@trpc/server'

export default async function HomePage() {
  let message = '';
  let secretMessage = '';
  const queryClient = getQueryClient();

  try {
    message = await queryClient.fetchQuery(trpc.auth.hello.queryOptions());
  } catch (error) {
    if (error instanceof TRPCError) {
      message = `Error: ${error.message}`;
    } else {
      message = 'An unexpected error occurred';
    }
  }

  try {
    secretMessage = await queryClient.fetchQuery(trpc.auth.getSecretMessage.queryOptions());
  } catch (error) {
    if (error instanceof TRPCError) {
      secretMessage = `Error: ${error.message}`;
      if (error.code === 'UNAUTHORIZED') {
        secretMessage = 'Please login to view this message';
      }
    } else {
      secretMessage = 'An unexpected error occurred';
    }
  }
  return (
    <HydrateClient>
      <main className="container flex min-h-dvh max-w-screen-lg flex-col items-center justify-center overflow-x-hidden">
        <Typography variant="h1" className="mb-4 text-center">
          Welcome To{' '}
          <span className="text-foreground dark:text-[hsl(221,89%,72%)]">
            TUCC APP
          </span>{' '}
        </Typography>
        <div className="text-center mb-4">
          <p>This text from public api request: {message}</p>
          <p>This is secret Message from private api: {secretMessage}</p>
        </div>

        <AuthShowcase />

        <ThemeBtn />

        <div className="mt-4 w-full max-w-2xl md:max-h-80 md:overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <p>Hello world!</p>
              </div>
            }
          >
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  )
}
