import { useEffect, useState, useTransition } from 'react'
import {
  checkForWin,
  checkIfTheAttempIsCompleted,
} from '../logic/userAnswersFunctions'
import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION,
} from '../cons/positionsIndex'

export function useBoardLogic() {
  const initialAnswers = Array(5)
    .fill(null)
    .map(() => Array(6).fill(null))
  const [answers, setAnswers] = useState(initialAnswers)
  const [wordToGuess, setWordToGuess] = useState('guagua')
  const [transition, setTransition] = useState(800)
  const [lettersSamePosition, setlettersSamePosition] = useState([])
  const [currentAtttempt, setCurrentAtttempt] = useState(0)
  const [nextField, setNextField] = useState(0)

  const handleKeyPress = (e) => {
    const answersCopy = [...answers]
    const isCompleted = checkIfTheAttempIsCompleted({
      arr: answersCopy,
      index: currentAtttempt,
    })
    const isWinner = checkForWin({
      userWord: answersCopy[currentAtttempt].join(''),
      wordToGuess: 'guagua',
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
    if (e.keyCode === 13 && isWinner) {
      alert('win')
      setAnswers(initialAnswers)
      setNextField(0)
      setCurrentAtttempt(0)
      return
    }

    // finish one attepm
    if (e.keyCode === 13 && isCompleted) {
      setNextField(0)
      setCurrentAtttempt((prev) => ++prev)

      const guess = wordToGuess.split('')
      const word = answersCopy[currentAtttempt]

      const data = []
      for (let i = 0; i < guess.length; i++) {
        if (word[i] === guess[i]) {
          data.push({
            letter: word[i],
            i,
            row: currentAtttempt,
            status: IS_SAME_POSITION,
            transition,
          })
          setTransition((prev) => (prev += 150))
        } else if (!guess.includes(word[i])) {
          data.push({
            letter: word[i],
            i,

            row: currentAtttempt,
            status: IS_NOT_INCLUDED,
            transition,
          })
          setTransition((prev) => (prev += 150))
        } else {
          data.push({
            letter: word[i],
            row: currentAtttempt,
            i,
            status: IS_INCLUDED,
            transition,
          })
          setTransition((prev) => (prev += 150))
        }
      }
      setlettersSamePosition((prev) => [...prev, data])

      return
    }
    console.log(lettersSamePosition)

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

  return { answers, lettersSamePosition, wordToGuess }
}
