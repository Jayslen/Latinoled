import { useEffect, useState, useContext } from 'react'
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
import { errorNotification, succesNotification } from '../components/notifications/tostifyNotification'
import dictionary from '../mocks/Diccionary.json'

export function useBoardLogic () {
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state: { currentField, wordToGuess, currentAttempt, country }, dispatch } = useContext(GameData)
  const [generateNewWord, setGenerateNewWord] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [warnModal, setWarnModal] = useState(false)
  const WordsInStorage = JSON.parse(localStorage.getItem(`${country}-words-played`))
  const [isUserWinner, setIsUserWinner] = useState(false)
  const [wordsPlayed, setWordsPlayed] = useState(WordsInStorage || [])

  const resetAttempt = () => {
    setAnswers(initialAnswers())
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: RESET_ATTEMPT })
    setOpenModal(false)
    setGenerateNewWord(prev => !prev)
  }

  const clearWordsPlayed = () => {
    setWordsPlayed([])
    setWarnModal(prev => !prev)
    succesNotification({ successMsg: 'Registro limpio' })
  }

  const handleKeyPress = (e) => {
    if (dictionary[country].length === wordsPlayed.length) {
      setWarnModal(prev => !prev)
      return
    }
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

      findLettersPositions({
        wordToGuess: wordToGuess.word.split(''),
        currentWord: answers[currentAttempt],
        attempt: currentAttempt,
        answers: answersCopy
      })
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
    if (e.keyCode === 13 && !isCompleted && !openModal) {
      errorNotification({ errorMsg: 'Complete el intento' })
      return
    }

    // error nums or simbols
    if (/\W/gi.test(e.key) || /\d/.test(e.key)) {
      errorNotification({ errorMsg: 'No puede escribir numeros o simbolos' })
      return
    }

    // fiels complete
    if (currentField > LAST_ANSWERS_INDEX && e.key.length === 1) {
      errorNotification({ errorMsg: 'Todos los campos completos' })
      return
    }

    if (e.key.length > 1) return

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
    const newWord = getNewWord({ wordsList: wordsPlayed, country })

    if (newWord === undefined) return

    dispatch({ type: UPDATE_WORD, payload: newWord })
    setWordsPlayed((prev) => [...prev, newWord])
    window.localStorage.setItem(`${country}-words-played`, JSON.stringify(wordsPlayed))
  }, [generateNewWord, warnModal])
  return {
    answers,
    openModal,
    isUserWinner,
    currentAttempt,
    warnModal,
    resetAttempt,
    clearWordsPlayed
  }
}
