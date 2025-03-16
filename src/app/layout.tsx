import "@/styles/globals.css";

import { Geist } from 'next/font/google'
import { Noto_Sans_Thai } from 'next/font/google'
import { Providers } from "@components/providers";
import { createMetadata } from "@/libs/metadata";
import { Toaster } from "sonner";
import { cn } from "@/libs/utils";
import Header from "@components/header/header";
import Footer from "@components/footer/footer";

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const notoSansThai = Noto_Sans_Thai({ variable: '--font-noto-sans-thai', subsets: ['thai'] })

const  RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-dvh font-sans antialiased', geistSans.variable, notoSansThai.variable)}>
        <Providers>
          <main>
            <Header />
            {children}
            <Footer />
          </main>
          <Toaster  position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout

export const metadata = createMetadata({})
