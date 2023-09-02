import { useContext } from 'react'
import { GameData } from '../context/gameDataContext'
import { motion } from 'framer-motion'
import { IS_INCLUDED, IS_SAME_POSITION } from '../constants/positionsIndex'
import { WinGameData } from './modal/WinGameText'
import { LostGameData } from './modal/LostGameText'

export function GameMoldal ({ resetAttempt, isWinner, attempt, board }) {
  const { state } = useContext(GameData)
  const { wordToGuess } = state
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="backdrop-blur-2xl absolute top-0 w-screen h-screen grid place-content-center text-[#212529]"
    >
      <motion.article
        initial={{ scale: 0.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 1, type: 'spring' }}
        className="bg-[#DEE2E6] w-96 h-auto px-2 py-2 flex flex-col gap-2 rounded"
      >
        {isWinner && <WinGameData word={wordToGuess.word} meaning={wordToGuess.meaning} attempt={attempt}/>}
        {!isWinner && <LostGameData word={wordToGuess.word} meaning={wordToGuess.meaning}/>}

        <section className="flex flex-col items-center w-[350px] gap-1 m-auto">
          {board.map((item, index) => {
            return (
              <ul key={index} className="grid grid-cols-5 w-full gap-2">
                {item.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={`p-4 text-center font-bold text-2xl rounded uppercase text-white ${
                        item.status === IS_SAME_POSITION
                          ? 'bg-[rgb(83,141,78)]'
                          : item.status === IS_INCLUDED
                          ? 'bg-[rgb(181,159,59)]'
                          : 'bg-[rgb(58,58,60)]'
                      }`}
                    >
                      {item.letter}
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </section>
        <button
          className="bg-[#212529] text-white px-2 py-4 rounded-full hover:bg-[#343A40] transition-colors font-bold"
          onClick={resetAttempt}
        >
          Empezar nuevo intento
        </button>
      </motion.article>
    </motion.section>
  )
}
