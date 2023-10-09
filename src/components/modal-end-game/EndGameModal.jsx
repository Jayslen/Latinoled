import { useContext, useEffect } from 'react'
import { UserGameData } from '../../context/userGameDataContext'
import { EndGameInfo } from './EndGameInfo'
import { MiniBoard } from '../MiniBoard'
import { Backdrop } from '../Backdrop'

export function GameMoldal ({ resetAttempt, isWinner, board }) {
  const { userData: { wordToGuess } } = useContext(UserGameData)
  const title = isWinner ? 'Bien Hecho' : 'Haz Fallado'

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
       <EndGameInfo word={wordToGuess.word} meaning={wordToGuess.meaning} title={title} />
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
