import { motion, AnimatePresence } from 'framer-motion'
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react'
import { useToggleTheme } from '../hook/useToggleTheme'

function LightMode () {
  return (
    <motion.button
      initial={{ translateY: -100, opacity: 0 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring' }}
    >
      <IconSunFilled />
    </motion.button>
  )
}

function DarkMode () {
  return (
    <motion.button
      initial={{ translateY: -100, opacity: 0 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring' }}
    >
      <IconMoonFilled />
    </motion.button>
  )
}

export function ThemeButton () {
  const { isDarkModeActive, handleCLick } = useToggleTheme()
  return (
    <div className="dark:text-white cursor-pointer" onClick={handleCLick}>
      <AnimatePresence>
        {isDarkModeActive && <LightMode />}
        {!isDarkModeActive && <DarkMode />}
      </AnimatePresence>
    </div>
  )
}
