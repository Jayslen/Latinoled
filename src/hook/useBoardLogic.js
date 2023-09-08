import { useEffect, useState, useContext, useRef } from 'react'
import { UserAnswersContext } from '../context/userAnswersContext'
import { GameData } from '../context/gameDataContext'
import {
  GO_ONE_FIELD_BACK,
  RESET_ATTEMPT,
  RESET_NEXT_FIELD,
  UPDATE_ATTEMPT,
  UPDATE_FIELD,
  UPDATE_WORD
} from '../constants/reducerTypes'
import { initialAnswers } from '../constants/initialStates'
import {
  checkForWin,
  checkIfTheAttempIsCompleted
} from '../logic/userAnswersFunctions'
import { getNewWord } from '../services/getNewWord'
import { findLettersPositions } from '../logic/LettesPositions'
import { showError } from '../components/notifications/tostifyNotification'

export function useBoardLogic () {
  const [generateNewWord, setGenerateNewWord] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isUserWinner, setIsUserWinner] = useState(false)
  const [lettersPosition, setlettersPosition] = useState([])
  const [wordPlayed, setWordPlayed] = useState([])
  const isFirstRender = useRef(true)
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state, dispatch } = useContext(GameData)
  const { currentField, wordToGuess, currentAttempt, country } = state

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
    const answersCopy = structuredClone(answers)
    const LAST_ANSWERS_INDEX = answersCopy.length - 1
    const isCompleted = checkIfTheAttempIsCompleted({
      arr: answersCopy,
      index: currentAttempt
    })
    const isWinner = checkForWin({
      userWord: answersCopy[currentAttempt],
      wordToGuess: wordToGuess.word
    })

    // check for winner or lost game
    if (
      (e.keyCode === 13 && isWinner) ||
      (currentAttempt === LAST_ANSWERS_INDEX && isCompleted && e.keyCode === 13)
    ) {
      setIsUserWinner(isWinner)
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
          wordToGuess: wordToGuess.word.split(''),
          currentWord: answers[currentAttempt],
          attempt: currentAttempt,
          answers: answersCopy
        })
      ])
      setAnswers(answersCopy)
      return
    }

    // delete last field
    if (e.keyCode === 8) {
      if (currentField === 0) return
      answersCopy[currentAttempt][currentField - 1].letter = null
      setAnswers(answersCopy)
      dispatch({ type: GO_ONE_FIELD_BACK })
    }

    // error attemp incomplete
    if (e.keyCode === 13 && !isCompleted) {
      showError({ errorMsg: 'Complete el intento' })
      return
    }

    // error nums or simbols
    if (/\W/gi.test(e.key) || /\d/.test(e.key)) {
      showError({ errorMsg: 'No puede escribir numeros o simbolos' })
      return
    }

    if (e.key.length > 1) {
      return
    }

    answersCopy[currentAttempt][currentField].letter = e.key.toLowerCase()
    setAnswers(answersCopy)
    dispatch({ type: UPDATE_FIELD })
  }

  useEffect(() => {
    window.document.body.addEventListener('keydown', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keydown', handleKeyPress)
  })

  useEffect(() => {
    // actualizar wordplayed
    if (isFirstRender.current || generateNewWord) {
      const newWord = getNewWord({ wordsList: wordPlayed, country })
      setWordPlayed((prev) => [...prev, newWord])
      if (newWord === undefined) return
      dispatch({ type: UPDATE_WORD, payload: newWord })
      setWordPlayed((prev) => [...prev, newWord])
      isFirstRender.current = false
    }
  }, [generateNewWord])

  return {
    answers,
    lettersPosition,
    openModal,
    isUserWinner,
    currentAttempt,
    resetAttempt
  }
}
