import { motion } from 'framer-motion'
import { headerModalsAnimation } from '../constants/animations'
import { useContext } from 'react'
import { UserGameData } from '../context/userGameDataContext'

export function StatsModal () {
  const { state: { maxStreak, winRate, tries } } = useContext(UserGameData)
  return (
    <motion.div
      initial={'hidden'}
      animate={'visible'}
      exit={'exit'}
      variants={headerModalsAnimation}
      className="bg-[#DEE2E6] dark:shadow-none shadow-2xl shadow-black text-light-mode-text w-full h-auto px-4 py-2 rounded-lg absolute right-0 z-10 sm:right-0 top-12 sm:w-80 sm:mr-2"
    >
      <ul className="flex justify-center gap-4">
        <li className="flex flex-col items-center">
          <span className="font-bold text-base">Jugados</span>
          <span>{tries}</span>
        </li>
        <li className="flex flex-col items-center">
          <span className="font-bold text-base">Victorias</span>
          <span>{winRate}</span>
        </li>
        <li className="flex flex-col items-center">
          <span className="font-bold text-base">Mejor Racha</span>
          <span>{maxStreak}</span>
        </li>
      </ul>
    </motion.div>
  )
}
