import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconAlertSquareFilled,
  IconBrandGithubFilled,
  IconChartBar
} from '@tabler/icons-react'
import { ThemeButton } from './ToggleThemeButton'
import { RulesModal } from './RulesModal'
import { headerIconsAnimation } from '../constants/animations'
import { StatsModal } from './StatsModal'

export function Header () {
  const [rulesModal, setRulesModal] = useState()
  const [statsModal, setStatsModal] = useState()
  const handleModal = () => {
    setRulesModal((prev) => !prev)
    setStatsModal(false)
  }

  return (
    <>
      <header className="text-light-mode-text flex justify-between items-center p-4 dark:text-dark-mode-text">
        <h2 className="text-2xl font-bold" lang="es" translate="no">
          <Link to={'/'}>Inicio</Link>
        </h2>
        <div className="flex gap-2">
          <motion.a
            whileTap="tap"
            whileHover={'hover'}
            variants={headerIconsAnimation}
            href="https://github.com/Jayslen/Latinoled"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandGithubFilled />
          </motion.a>

          <motion.div
            className="cursor-pointer"
            whileTap="tap"
            whileHover={'hover'}
            variants={headerIconsAnimation}
            onClick={handleModal}
          >
            <IconAlertSquareFilled />
          </motion.div>

          <motion.div
            className="cursor-pointer"
            whileTap="tap"
            whileHover={'hover'}
            variants={headerIconsAnimation}
            onClick={() => {
              setRulesModal(false)
              setStatsModal(prev => !prev)
            }}
          >
            <IconChartBar />
          </motion.div>

          <ThemeButton />
        </div>

        <AnimatePresence>
          {rulesModal && <RulesModal />}
          {statsModal && <StatsModal />}
        </AnimatePresence>
      </header>
      <Outlet />
    </>
  )
}
