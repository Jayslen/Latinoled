import { useContext, useEffect } from 'react'
import { UserGameData } from '../context/userGameDataContext'
import { MiniBoard } from './MiniBoard'
import { Backdrop } from './Backdrop'
import countries from '../mocks/countries.json'

export function GameMoldal ({ resetAttempt, isWinner, board }) {
  const { userData: { wordToGuess, country } } = useContext(UserGameData)
  const title = isWinner ? 'Bien Hecho' : 'Haz Fallado'
  const description = isWinner
    ? 'Haz adivinado la palabra.'
    : 'La palabra para adivinar era'
  const image = countries.find(item => item.country === country).image

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
      <div className="text-center">
        <h2 className="font-bold text-4xl sm:text-5xl">{title}</h2>
        <p className="text-lg">{description}</p>
        <div className='flex justify-center items-center gap-1 mb-1.5'>
          <span className="font-bold text-3xl capitalize sm:text-4xl"> {wordToGuess.word}</span>
          <img src={image} alt={`Bandera de ${country}`} className='w-10' />
        </div>

        <details className="border-[1px] border-[#aaa] rounded px-[0.5em] max-w-xs m-auto open:p-1 group">
          <summary className="font-bold text-lg -mx-2 p-1 border-b-0 border-b-[#aaa] group-open:border-b-[1px]">
            Significado
          </summary>
          {wordToGuess.meaning}
        </details>

      </div>

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
