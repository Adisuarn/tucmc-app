import React, { ReactNode } from 'react'
import Header from '@components/header/header'
import Footer from '@components/footer/footer'
import "react-datepicker/dist/react-datepicker.css";

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
