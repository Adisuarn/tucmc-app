import React, { ReactNode } from 'react'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}

export default MainLayout
