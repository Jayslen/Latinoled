import { useContext, useEffect } from 'react'
import { UserGameData } from '../../context/userGameDataContext'
import { WinGameData } from './WinGameText'
import { LostGameData } from './LostGameText'
import { MiniBoard } from './MiniBoard'
import { Backdrop } from '../Backdrop'

export function GameMoldal ({ resetAttempt, isWinner, attempt, board, updateStreak }) {
  const { state: { wordToGuess } } = useContext(UserGameData)
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      resetAttempt()
      updateStreak({ isUserWinner: isWinner })
    }
  }

  useEffect(() => {
    window.document.body.addEventListener('keypress', handleKeyPress)

    return () => {
      window.document.body.removeEventListener('keypress', handleKeyPress)
    }
  })

  return (
    <Backdrop>
        {isWinner
          ? (
          <WinGameData
            word={wordToGuess.word}
            meaning={wordToGuess.meaning}
            attempt={attempt}
          />
            )
          : (
          <LostGameData word={wordToGuess.word} meaning={wordToGuess.meaning} />
            )}

        <MiniBoard board={board} />

        <button
          className="bg-[#212529] text-white px-2 py-4 rounded-full hover:bg-[#343A40] transition-colors font-bold"
          onClick={resetAttempt}
        >
          Empezar nuevo intento
        </button>
    </Backdrop>
  )
}
