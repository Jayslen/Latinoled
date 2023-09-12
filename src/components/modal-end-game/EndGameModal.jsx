import { useContext, useEffect } from 'react'
import { GameData } from '../../context/gameDataContext'
import { WinGameData } from './WinGameText'
import { LostGameData } from './LostGameText'
import { MiniBoard } from './MiniBoard'
import { Backdrop } from '../Backdrop'

export function GameMoldal ({ resetAttempt, isWinner, attempt, board }) {
  const { state } = useContext(GameData)
  const { wordToGuess } = state
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      resetAttempt()
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