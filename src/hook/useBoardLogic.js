import { useEffect, useContext } from 'react'
import { UserAnswersContext } from '../context/userAnswersContext'
import { UserGameData } from '../context/userGameDataContext'
import { GameData } from '../context/gameDataContext'
import { UPDATE_WORD } from '../constants/reducerTypes'
import { UPDATE_ENDGAME_MODAL, UPDATE_IS_WINNER, UPDATE_WARN_MODAL, UPDATE_WORDS_PLAYED } from '../constants/gameOptionsReducerTypes'
import { getNewWord } from '../services/getNewWord'
import { checkForWin, checkIfTheAttempIsCompleted } from '../logic/userAnswersFunctions'
import { errorNotification } from '../components/notifications/tostifyNotification'
import dictionary from '../mocks/Diccionary.json'
import { useUpdateStates } from './useUpdateGloblaStates'

export function useBoardLogic () {
  const { answers } = useContext(UserAnswersContext)
  const { state: { currentField, wordToGuess, currentAttempt, country, generateNewWord }, dispatch } = useContext(UserGameData)
  const { options: { endGameModal, warnModal, wordsPlayed }, dispatchOptions } = useContext(GameData)
  const { setNewLetter, deleteLastField, finishAttempt } = useUpdateStates()

  const handleKeyPress = (e) => {
    if (dictionary[country].length === wordsPlayed.length) {
      dispatchOptions({ type: UPDATE_WARN_MODAL })
      return
    }

    if (endGameModal || warnModal) return

    const answersCopy = structuredClone(answers)
    const LAST_ANSWERS_INDEX = answersCopy.length - 1
    const isCompleted = checkIfTheAttempIsCompleted({ arr: answersCopy, index: currentAttempt })
    const isWinner = checkForWin({ userWord: answersCopy[currentAttempt], wordToGuess: wordToGuess.word })

    // check for winner or lost game
    if ((e.keyCode === 13 && isWinner) || (currentAttempt === LAST_ANSWERS_INDEX && isCompleted && e.keyCode === 13)) {
      dispatchOptions({ type: UPDATE_IS_WINNER, payload: isWinner })
      setTimeout(() => {
        dispatchOptions({ type: UPDATE_ENDGAME_MODAL })
      }, 700)
    }

    // finish one attepm
    if (e.keyCode === 13 && isCompleted) {
      finishAttempt({ answersCopy })
      return
    }

    // delete last field
    if (e.keyCode === 8) {
      deleteLastField({ answersCopy })
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

    setNewLetter({ answersCopy, currentLetter: e.key.toLowerCase() })
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

  return { answers }
}
