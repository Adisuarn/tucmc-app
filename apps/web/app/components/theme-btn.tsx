'use client'

import { useEffect, useState } from 'react'

import { Button } from '@tucc/ui/button'
import { MoonIcon, SunIcon } from '@tucc/ui/icons'
import { useTheme } from '@tucc/ui/utils'

export const ThemeBtn: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const [isMounted, setMount] = useState<boolean>(false)
  useEffect(() => {
    setMount(true)
  }, [])
  if (!isMounted) return null

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed right-4 bottom-4"
      onClick={toggle}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
