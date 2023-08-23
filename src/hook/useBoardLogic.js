import { useEffect, useState, useContext } from 'react'
import { UserAnswersContext } from '../context/userAnswersContext'
import { GameData } from '../context/gameDataContext'
import { GO_ONE_FIELD_BACK, RESET_ATTEMPT, RESET_NEXT_FIELD, UPDATE_ATTEMPT, UPDATE_FIELD } from '../constants/reducerTypes'
import {
  checkForWin,
  checkIfTheAttempIsCompleted,
  findLettersPositions
} from '../logic/userAnswersFunctions'
import { initialAnswers } from '../constants/initialStates'

export function useBoardLogic () {
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state, dispatch } = useContext(GameData)
  const { currentField, wordToGuess, currentAttempt } = state
  const [lettersPosition, setlettersPosition] = useState([])

  const resestAttempt = () => {
    setAnswers(initialAnswers())
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

    // delete letter
    // !OJO REVISAR
    if (e.keyCode === 8) {
      answersCopy[currentAttempt][currentField] = null
      dispatch({ type: GO_ONE_FIELD_BACK })
      setAnswers(answersCopy)
    }

    if (
      isCompleted ||
      /\W/gi.test(e.key) ||
      /\d/.test(e.key) ||
      e.keyCode === 13 ||
      (e.key.length > 1)
    ) return

    console.log('ggg')
    answersCopy[currentAttempt][currentField] = e.key
    setAnswers(answersCopy)
    dispatch({ type: UPDATE_FIELD })
  }
  useEffect(() => {
    window.document.body.addEventListener('keydown', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keydown', handleKeyPress)
  })

  return { answers, lettersPosition }
}
