import { useEffect, useState } from 'react'
import {
  checkForWin,
  checkIfTheAttempIsCompleted,
  findLettersPositions
} from '../logic/userAnswersFunctions'

export function useBoardLogic () {
  const initialAnswers = Array(5)
    .fill(null)
    .map(() => Array(5).fill(null))
  const [answers, setAnswers] = useState(initialAnswers)
  const [wordToGuess] = useState('paila')
  const [lettersPosition, setlettersPosition] = useState([])
  const [currentAttempt, setCurrentAtttempt] = useState(0)
  const [nextField, setNextField] = useState(0)

  const resestAttempt = () => {
    setAnswers(initialAnswers)
    setNextField(0)
    setCurrentAtttempt(0)
    setlettersPosition([])
  }

  const handleKeyPress = (e) => {
    const answersCopy = [...answers]
    const isCompleted = checkIfTheAttempIsCompleted({
      arr: answersCopy,
      index: currentAttempt
    })
    const isWinner = checkForWin({
      userWord: answersCopy[currentAttempt].join(''),
      wordToGuess
    })

    // check for lost game
    if (currentAttempt === 4 && isCompleted && e.keyCode === 13) {
      alert('end game')
      resestAttempt()
      return
    }

    // check for winner
    if (e.keyCode === 13 && isWinner) {
      findLettersPositions({
        wordToGuess: wordToGuess.split(''),
        userWord: answers[currentAttempt]
      })
      setTimeout(() => {
        alert('win')
        resestAttempt()
      }, 400)
    }

    // finish one attepm
    if (e.keyCode === 13 && isCompleted) {
      setNextField(0)
      setCurrentAtttempt((prev) => ++prev)

      setlettersPosition((prev) => [
        ...prev,

        findLettersPositions({
          wordToGuess: wordToGuess.split(''),
          userWord: answers[currentAttempt]
        })
      ])
      return
    }

    if (
      isCompleted ||
      /\W/gi.test(e.key) ||
      /\d/.test(e.key) ||
      e.keyCode === 13
    ) return

    answersCopy[currentAttempt][nextField] = e.key
    setAnswers(answersCopy)
    setNextField((prev) => ++prev)
  }

  const handleVirtualKeyboardKeyPress = (e) => {
    console.log(e.target.textContent)
  }
  useEffect(() => {
    window.document.body.addEventListener('keypress', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keypress', handleKeyPress)
  })

  return { answers, lettersPosition, handleVirtualKeyboardKeyPress }
}
