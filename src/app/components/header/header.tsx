import React from 'react'
import { Sparkles } from 'lucide-react'
import HeaderItems from './header-items'
import { getSession } from '@/libs/auth'

const Header = async () => {
  const session = await getSession()
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-[#f687b3]" />
          <span className="text-2xl font-bold text-gray-800">TUCC APP</span>
        </div>
        <div className="flex items-center space-x-4">
          <HeaderItems session={session} />
        </div>
      </div>
    </header>
  )
}

export default Header
