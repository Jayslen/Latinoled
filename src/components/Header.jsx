import { IconAlertSquareFilled, IconBrandGithubFilled } from '@tabler/icons-react'
import { ThemeButton } from './ToggleThemeButton'
import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { RulesModal } from './RulesModal'
import { AnimatePresence } from 'framer-motion'

export function Header () {
  const [rulesModal, setRulesModal] = useState()
  const handleModal = () => {
    setRulesModal(prev => !prev)
  }

  return (
    <>
      <header className="text-light-mode-text flex justify-between items-center font-Poppins p-4 dark:text-dark-mode-text">
        <h2 className="text-2xl font-bold" lang="es" translate="no">
          <Link to={'/'}>Inicio</Link>
        </h2>
        <div className="flex gap-2">
          <a href="https://github.com/Jayslen/Latinoled" target='_blank' className='hover:scale-125 transition-all' rel="noreferrer">
            <IconBrandGithubFilled/>
          </a>
            <IconAlertSquareFilled onClick={handleModal} className='hover:scale-125 transition-all cursor-pointer' />
          <ThemeButton/>
        </div>
      </header>
      <AnimatePresence>
            {rulesModal && <RulesModal closeModal={handleModal}/>}
      </AnimatePresence>
      <Outlet />
    </>
  )
}
