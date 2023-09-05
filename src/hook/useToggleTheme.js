import { useEffect, useState } from 'react'

export function useToggleTheme () {
  const [isDarkModeActive, setIsDarkModeActive] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const handleCLick = () => {
    setIsDarkModeActive(prev => !prev)
  }

  useEffect(() => {
    if (isDarkModeActive) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkModeActive])
  return { handleCLick, isDarkModeActive }
}
