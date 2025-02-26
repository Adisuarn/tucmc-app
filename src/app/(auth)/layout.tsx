import React, { ReactNode } from 'react'
import Header from '@components/header/header'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default AuthLayout
