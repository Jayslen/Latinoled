import {
  IconAlertSquareFilled,
  IconBrandGithubFilled,
  IconShieldLockFilled
} from '@tabler/icons-react'
import { ThemeButton } from './ToggleThemeButton'
import { Link, Outlet } from 'react-router-dom'

export function Header () {
  return (
    <>
      <header className="text-light-mode-text flex justify-between items-center font-Poppins p-4 dark:text-dark-mode-text">
        <h2 className="text-2xl font-bold" lang="es" translate="no">
          <Link to={'/'}>Inicio</Link>
        </h2>
        <div className="flex gap-2">
          <a href="https://github.com/Jayslen/Latinoled" target='_blank' className='hover:scale-125 transition-transform' rel="noreferrer">
            <IconBrandGithubFilled />
          </a>
          <IconAlertSquareFilled />
          <IconShieldLockFilled />
          <ThemeButton />
        </div>
      </header>
      <Outlet />
    </>
  )
}
