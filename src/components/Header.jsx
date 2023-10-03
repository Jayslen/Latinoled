import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconAlertSquareFilled,
  IconBrandGithubFilled
} from '@tabler/icons-react'
import { ThemeButton } from './ToggleThemeButton'
import { RulesModal } from './RulesModal'
import { headerIconsAnimation } from '../constants/animations'

export function Header () {
  const [rulesModal, setRulesModal] = useState()
  const handleModal = () => {
    setRulesModal((prev) => !prev)
  }

  return (
    <>
      <header className="text-light-mode-text flex justify-between items-center font-Poppins p-4 dark:text-dark-mode-text">
        <h2 className="text-2xl font-bold" lang="es" translate="no">
          <Link to={'/'}>Inicio</Link>
        </h2>
        <div className="flex gap-2">
          <motion.a
            whileTap='tap'
            whileHover={'hover'}
            variants={headerIconsAnimation}
            href="https://github.com/Jayslen/Latinoled"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandGithubFilled />
          </motion.a>

          <motion.div whileTap="tap" whileHover={'hover'} variants={headerIconsAnimation}>
            <IconAlertSquareFilled
              onClick={handleModal}
              className="cursor-pointer"
            />
          </motion.div>
          <ThemeButton />
        </div>
      </header>
      <AnimatePresence>{rulesModal && <RulesModal />}</AnimatePresence>
      <Outlet />
    </>
  )
}
