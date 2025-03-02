import React, { ReactNode } from 'react'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'

const FeaturesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  )
}

export default FeaturesLayout
