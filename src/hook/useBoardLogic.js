import { useEffect, useState } from 'react'
import {
  checkForWin,
  checkIfTheAttempIsCompleted,
  findLettersPositions,
} from '../logic/userAnswersFunctions'

export function useBoardLogic() {
  const initialAnswers = Array(5)
    .fill(null)
    .map(() => Array(5).fill(null))
  const [answers, setAnswers] = useState(initialAnswers)
  const [wordToGuess] = useState('paila')
  const [lettersPosition, setlettersPosition] = useState([])
  const [currentAtttempt, setCurrentAtttempt] = useState(0)
  const [nextField, setNextField] = useState(0)
  const [gameReset, setGameReset] = useState(false)

  const resestAttempt = () => {
    setAnswers(initialAnswers)
    setNextField(0)
    setCurrentAtttempt(0)
    setlettersPosition([])
    setGameReset(!gameReset)
  }

  const handleKeyPress = (e) => {
    const answersCopy = [...answers]
    const isCompleted = checkIfTheAttempIsCompleted({
      arr: answersCopy,
      index: currentAtttempt,
    })
    const isWinner = checkForWin({
      userWord: answersCopy[currentAtttempt].join(''),
      wordToGuess,
    })

    // check for lost game
    if (currentAtttempt === 4 && isCompleted && e.keyCode === 13) {
      alert('end game')
      resestAttempt()
      return
    }

    // check for winner
    if (e.keyCode === 13 && isWinner) {
      alert('win')
      resestAttempt()
      return
    }

    // finish one attepm
    if (e.keyCode === 13 && isCompleted) {
      setNextField(0)
      setCurrentAtttempt((prev) => ++prev)

      setlettersPosition((prev) => [
        ...prev,

        findLettersPositions({
          wordToGuess: wordToGuess.split(''),
          userWord: answers[currentAtttempt],
        }),
      ])
      return
    }

    if (
      isCompleted ||
      /\W/gi.test(e.key) ||
      /\d/.test(e.key) ||
      e.keyCode === 13
    )
      return

    answersCopy[currentAtttempt][nextField] = e.key
    setAnswers(answersCopy)
    setNextField((prev) => ++prev)
  }

  useEffect(() => {
    window.document.body.addEventListener('keypress', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keypress', handleKeyPress)
  })

  return { answers, lettersPosition, wordToGuess }
}
