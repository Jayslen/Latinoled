import { IconBrandInstagram, IconBrandX, IconBrandGithubFilled } from '@tabler/icons-react'

export function Footer () {
  return (
    <footer className="text-light-mode-text dark:text-dark-mode-text absolute bottom-0 w-full">
        <ul>
            <li>{<IconBrandGithubFilled/>}</li>
        </ul>
    </footer>
  )
}
