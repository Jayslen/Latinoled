import { useEffect, useState, useContext } from 'react'
import {
  checkForWin,
  checkIfTheAttempIsCompleted,
  findLettersPositions
} from '../logic/userAnswersFunctions'
import { GameData } from '../components/context/gameDataContext'
import { RESET_ATTEMPT, RESET_NEXT_FIELD, UPDATE_ATTEMPT, UPDATE_FIELD } from '../constants/reducerTypes'

const initialAnswers = Array(5)
  .fill(null)
  .map(() => Array(5).fill(null))

export function useBoardLogic () {
  const [answers, setAnswers] = useState(initialAnswers)
  const { state, dispatch } = useContext(GameData)
  const { nextField, wordToGuess, currentAttempt } = state
  const [lettersPosition, setlettersPosition] = useState([])

  const resestAttempt = () => {
    setAnswers(initialAnswers)
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: RESET_ATTEMPT })

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
      dispatch({ type: RESET_NEXT_FIELD })
      dispatch({ type: UPDATE_ATTEMPT })

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
    dispatch({ type: UPDATE_FIELD })
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
