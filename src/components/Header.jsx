import { GithubIcon, InfoIcon } from './Icons'

export function Header() {
  return (
    <header className="text-white flex justify-between p-4 border-b">
      <InfoIcon />
      <h2 className="text-2xl font-bold">Bobodle</h2>
      <GithubIcon />
    </header>
  )
}
