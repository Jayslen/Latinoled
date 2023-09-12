import { useEffect, useContext } from 'react'
import { UserAnswersContext } from '../context/userAnswersContext'
import { UserGameData } from '../context/userGameDataContext'
import { GameData } from '../context/gameDataContext'
import { initialAnswers } from '../constants/initialStates'
import { GO_ONE_FIELD_BACK, RESET_ATTEMPT, RESET_NEXT_FIELD, UPDATE_ATTEMPT, UPDATE_FIELD, UPDATE_WORD, UPDATE_GENERATE_NEW_WORD } from '../constants/reducerTypes'
import { CLEAR_WORDS_PLAYED, UPDATE_ENDGAME_MODAL, UPDATE_IS_WINNER, UPDATE_WARN_MODAL, UPDATE_WORDS_PLAYED } from '../constants/gameOptionsReducerTypes'
import { getNewWord } from '../services/getNewWord'
import { checkForWin, checkIfTheAttempIsCompleted } from '../logic/userAnswersFunctions'
import { findLettersPositions } from '../logic/LettesPositions'
import { errorNotification, succesNotification } from '../components/notifications/tostifyNotification'
import dictionary from '../mocks/Diccionary.json'

export function useBoardLogic () {
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state: { currentField, wordToGuess, currentAttempt, country, generateNewWord }, dispatch } = useContext(UserGameData)
  const { options: { endGameModal, warnModal, isUserWinner, wordsPlayed }, dispatchOptions } = useContext(GameData)

  const resetAttempt = () => {
    setAnswers(initialAnswers())
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: RESET_ATTEMPT })
    dispatchOptions({ type: UPDATE_ENDGAME_MODAL })
    dispatch({ type: UPDATE_GENERATE_NEW_WORD })
    window.localStorage.setItem(`${country}-words-played`, JSON.stringify(wordsPlayed))
  }

  const clearWordsPlayed = () => {
    dispatchOptions({ type: CLEAR_WORDS_PLAYED })
    dispatchOptions({ type: UPDATE_WARN_MODAL })
    succesNotification({ successMsg: 'Registro limpio' })
  }

  const handleKeyPress = (e) => {
    if (dictionary[country].length === wordsPlayed.length) {
      dispatchOptions({ type: UPDATE_WARN_MODAL })
      return
    }
    if (endGameModal || warnModal) return

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
      dispatchOptions({ type: UPDATE_IS_WINNER, payload: isWinner })
      setTimeout(() => {
        dispatchOptions({ type: UPDATE_ENDGAME_MODAL })
      }, 700)
    }

    // finish one attepm
    if (e.keyCode === 13 && isCompleted) {
      findLettersPositions({
        wordToGuess: wordToGuess.word.split(''),
        currentWord: answers[currentAttempt],
        attempt: currentAttempt,
        answers: answersCopy
      })
      dispatch({ type: RESET_NEXT_FIELD })
      dispatch({ type: UPDATE_ATTEMPT })
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
    if (e.keyCode === 13 && !isCompleted && !endGameModal) {
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
    dispatchOptions({ type: UPDATE_WORDS_PLAYED, payload: newWord })
    console.log({ storage: JSON.parse(localStorage.getItem(`${country}-words-played`)), wordsPlayed })
  }, [generateNewWord])

  useEffect(() => {
    window.localStorage.setItem('country', country)
  }, [])
  return {
    answers,
    endGameModal,
    isUserWinner,
    currentAttempt,
    warnModal,
    resetAttempt,
    clearWordsPlayed
  }
}
