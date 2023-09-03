import { IconAlertSquareFilled, IconBrandGithubFilled, IconSettingsFilled } from '@tabler/icons-react'
import { ThemeButton } from './ToggleThemeButton'

export function Header () {
  return (
    <header className="text-[##131316] flex justify-between p-4  font-Poppins dark:border-b-white dark:text-white">
      <h2 className="text-2xl font-bold" lang="es" translate="no">
        Bobodle
      </h2>
      <div className='flex gap-2'>
        <IconBrandGithubFilled />
        <IconAlertSquareFilled />
        <IconSettingsFilled/>
        <ThemeButton />
      </div>
    </header>
  )
}
