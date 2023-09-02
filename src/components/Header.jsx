import { GithubIcon, InfoIcon } from './Icons'

export function Header () {
  return (
    <header className="text-white flex justify-between p-4 border-b font-Poppins">
      <InfoIcon />
      <h2 className="text-2xl font-bold" lang='es' translate='no'>Bobodle</h2>
      <GithubIcon />
    </header>
  )
}
