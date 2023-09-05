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
  checkAnswersStorage,
  checkForWin,
  checkIfTheAttempIsCompleted
} from '../logic/userAnswersFunctions'
import { getNewWord } from '../services/getNewWord'
import { findLettersPositions } from '../logic/LettesPositions'

export function useBoardLogic () {
  const [generateNewWord, setGenerateNewWord] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isUserWinner, setIsUserWinner] = useState(false)
  const [boardExample, setBoardExample] = useState([])
  const [lettersPosition, setlettersPosition] = useState([])
  const [wordPlayed, setWordPlayed] = useState([])
  const isFirstRender = useRef(true)
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state, dispatch } = useContext(GameData)
  const { currentField, wordToGuess, currentAttempt } = state

  const resetAttempt = () => {
    setAnswers(initialAnswers())
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: RESET_ATTEMPT })
    setlettersPosition([])
    setOpenModal(false)
    setGenerateNewWord(true)
    setBoardExample([])
    setTimeout(() => {
      setGenerateNewWord(false)
    }, 600)
  }

  const updateBoardExample = () => {
    setBoardExample((prev) => [
      ...prev,
      findLettersPositions({
        wordToGuess: wordToGuess.word.split(''),
        userWord: answers[currentAttempt]
      })
    ])
  }

  const handleKeyPress = (e) => {
    const answersCopy = [...answers]
    const LAST_ANSWERS_INDEX = answersCopy.length - 1
    const isCompleted = checkIfTheAttempIsCompleted({
      arr: answersCopy,
      index: currentAttempt
    })
    const isWinner = checkForWin({
      userWord: answersCopy[currentAttempt].join(''),
      wordToGuess: wordToGuess.word
    })

    // check for winner or lost game
    if ((e.keyCode === 13 && isWinner) || (currentAttempt === LAST_ANSWERS_INDEX && isCompleted && e.keyCode === 13)) {
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
          userWord: answers[currentAttempt]
        })
      ])
      updateBoardExample()
      return
    }

    // delete last field
    if (e.keyCode === 8) {
      if (currentField === 0) return
      answersCopy[currentAttempt][currentField - 1] = null
      setAnswers(answersCopy)
      dispatch({ type: GO_ONE_FIELD_BACK })
    }

    if (isCompleted ||
      /\W/gi.test(e.key) ||
      /\d/.test(e.key) ||
      e.keyCode === 13 ||
      e.key.length > 1) return

    answersCopy[currentAttempt][currentField] = e.key
    setAnswers(answersCopy)
    dispatch({ type: UPDATE_FIELD })
    localStorage.setItem('answers', JSON.stringify(answersCopy))
  }

  useEffect(() => {
    window.document.body.addEventListener('keydown', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keydown', handleKeyPress)
  })

  useEffect(() => {
    const answersInStorage = JSON.parse(localStorage.getItem('answers'))
    checkAnswersStorage({ storage: answersInStorage })
  }, [])

  useEffect(() => {
    if (isFirstRender.current || generateNewWord) {
      const newWord = getNewWord(wordPlayed)
      if (newWord === undefined) return
      dispatch({ type: UPDATE_WORD, payload: newWord })
      setWordPlayed((prev) => [...prev, newWord])
      localStorage.setItem('words-played', JSON.stringify(wordPlayed))
      isFirstRender.current = false
    }
  }, [generateNewWord])

  return {
    answers,
    lettersPosition,
    openModal,
    resetAttempt,
    isUserWinner,
    currentAttempt,
    boardExample
  }
}
