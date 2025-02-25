import '@/app/globals.css'

import { Geist } from 'next/font/google'
import { Noto_Sans_Thai } from 'next/font/google'

import { Toaster } from '@tucc/ui/sonner'
import { cn, ThemeProvider } from '@tucc/ui/utils'

import { createMetadata } from '@/lib/metadata'
import { TRPCReactProvider } from '@/lib/trpc/react'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const notoSansThai = Noto_Sans_Thai({ variable: '--font-noto-sans-thai', subsets: ['thai'] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-dvh font-sans antialiased', geistSans.variable, notoSansThai.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = createMetadata({})
