import { useEffect, useState } from 'react'
import {
  checkForWin,
  checkIfTheAttempIsCompleted,
} from '../logic/userAnswersFunctions'

const initialAnswers = Array(5)
  .fill(null)
  .map(() => Array(6).fill(null))

export function useBoardLogic() {
  const [answers, setAnswers] = useState(initialAnswers)
  const [currentAtttempt, setCurrentAtttempt] = useState(0)
  const [nextField, setNextField] = useState(0)

  useEffect(() => {
    const handleKeyPress = (e) => {
      const answersCopy = [...answers]
      const isCompleted = checkIfTheAttempIsCompleted({
        arr: answersCopy,
        index: currentAtttempt,
      })
      const isWinner = checkForWin({
        userWord: answersCopy[currentAtttempt].join(''),
        wordToGuess: 'tigere',
      })

      // check for lost game
      if (currentAtttempt === 4 && isCompleted && e.keyCode === 13) {
        alert('end game')
        setAnswers(initialAnswers)
        setNextField(0)
        setCurrentAtttempt(0)
        return
      }

      // check for winner
      if (isWinner) {
        alert('win')
        setAnswers(initialAnswers)
        setNextField(0)
        setCurrentAtttempt(0)
        return
      }

      // condition press enter
      if (e.keyCode === 13 && isCompleted) {
        setNextField(0)
        setCurrentAtttempt((prev) => ++prev)
        return
      }

      if (
        isCompleted ||
        e.keyCode === 13 ||
        e.key.match(/\d/gi || e.key.match(/\W/gi))
      )
        return

      answersCopy[currentAtttempt][nextField] = e.key
      setAnswers(answersCopy)
      setNextField((prev) => ++prev)
    }

    window.document.body.addEventListener('keypress', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keypress', handleKeyPress)
  }, [answers, nextField, currentAtttempt])

  return { answers }
}
