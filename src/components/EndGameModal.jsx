import { useContext } from 'react'
import { GameData } from '../context/gameDataContext'
import { motion } from 'framer-motion'
import { WinGameData } from './modal/WinGameText'
import { LostGameData } from './modal/LostGameText'
import { MiniBoard } from './modal/MiniBoard'

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
        className="bg-[#DEE2E6] w-96 h-auto px-4 py-2 flex flex-col gap-2 rounded-sm"
      >
        {isWinner && (
          <WinGameData
            word={wordToGuess.word}
            meaning={wordToGuess.meaning}
            attempt={attempt}
          />
        )}
        {!isWinner && (
          <LostGameData word={wordToGuess.word} meaning={wordToGuess.meaning} />
        )}

        <MiniBoard board={board} />

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
