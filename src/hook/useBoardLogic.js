import { useEffect, useState, useContext, useRef } from 'react'
import { UserAnswersContext } from '../context/userAnswersContext'
import { GameData } from '../context/gameDataContext'
import { GO_ONE_FIELD_BACK, RESET_ATTEMPT, RESET_NEXT_FIELD, UPDATE_ATTEMPT, UPDATE_FIELD, UPDATE_WORD } from '../constants/reducerTypes'
import {
  checkForWin,
  checkIfTheAttempIsCompleted,
  findLettersPositions
} from '../logic/userAnswersFunctions'
import { initialAnswers } from '../constants/initialStates'
import { getNewWord } from '../services/getNewWord'

export function useBoardLogic () {
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state, dispatch } = useContext(GameData)
  const { currentField, wordToGuess, currentAttempt } = state
  const [lettersPosition, setlettersPosition] = useState([])
  const [generateNewWord, setGenerateNewWord] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [wordPlayed, setWordPlayed] = useState([])
  const isFirstRender = useRef(true)

  const resetAttempt = () => {
    setAnswers(initialAnswers())
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: RESET_ATTEMPT })
    setlettersPosition([])
    setOpenModal(false)
    setGenerateNewWord(true)
    setTimeout(() => {
      setGenerateNewWord(false)
    }, 600)
  }

  const handleKeyPress = (e) => {
    const answersCopy = [...answers]
    const isCompleted = checkIfTheAttempIsCompleted({ arr: answersCopy, index: currentAttempt })
    const isWinner = checkForWin({ userWord: answersCopy[currentAttempt].join(''), wordToGuess })
    // const LAST_ANSWERS_INDEX = answers.length - 1

    // if (isWinner || answersCopy[LAST_ANSWERS_INDEX].every(value => value !== null)) {
    //   setFinishTry(true)
    // }

    // check for lost game
    if (currentAttempt === 4 && isCompleted && e.keyCode === 13) {
      setOpenModal(true)
      return
    }

    // check for winner
    if (e.keyCode === 13 && isWinner) {
      findLettersPositions({
        wordToGuess: wordToGuess.split(''),
        userWord: answers[currentAttempt]
      })
      setTimeout(() => {
        setOpenModal(true)
      }, 700)
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

    // delete last field
    if (e.keyCode === 8) {
      answersCopy[currentAttempt][currentField - 1] = null
      setAnswers(answersCopy)
      if (currentField !== 0) dispatch({ type: GO_ONE_FIELD_BACK })
    }

    if (
      isCompleted ||
      /\W/gi.test(e.key) ||
      /\d/.test(e.key) ||
      e.keyCode === 13 ||
      (e.key.length > 1)
    ) return

    answersCopy[currentAttempt][currentField] = e.key
    setAnswers(answersCopy)
    dispatch({ type: UPDATE_FIELD })
  }

  useEffect(() => {
    window.document.body.addEventListener('keydown', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keydown', handleKeyPress)
  })

  useEffect(() => {
    if (isFirstRender.current || generateNewWord) {
      const newWord = getNewWord(wordPlayed)
      dispatch({ type: UPDATE_WORD, payload: newWord.word })

      if (newWord === undefined) return
      setWordPlayed(prev => [...prev, newWord])
      isFirstRender.current = false
    }
  }, [generateNewWord])
  console.log(wordToGuess)

  return { answers, lettersPosition, openModal, resetAttempt }
}
