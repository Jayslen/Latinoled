import { UserGameData } from '../context/userGameDataContext'
import { GameData } from '../context/gameDataContext'
import { UserAnswersContext } from '../context/userAnswersContext'
import dictionary from '../mocks/Diccionary.json'
import { UPDATE_ENDGAME_MODAL, UPDATE_IS_WINNER, UPDATE_WARN_MODAL } from '../constants/gameOptionsReducerTypes'
import { useContext } from 'react'
import { RESET_NEXT_FIELD, UPDATE_ATTEMPT } from '../constants/reducerTypes'
import { checkForWin, checkIfTheAttempIsCompleted } from '../logic/userAnswersFunctions'
import { useUpdateStates } from './useUpdateGloblaStates'
import { errorNotification } from '../components/notifications/tostifyNotification'
import { findLettersPositions } from '../logic/LettesPositions'

export function useVirtualKey () {
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state: { currentField, wordToGuess, currentAttempt, country }, dispatch } = useContext(UserGameData)
  const { options: { endGameModal, warnModal, isUserWinner, wordsPlayed }, dispatchOptions } = useContext(GameData)
  const { setNewLetter, deleteLastField } = useUpdateStates()

  const handlePressKey = (e) => {
    const currentLetter = e.target.textContent.toLowerCase()

    if (dictionary[country].length === wordsPlayed.length) {
      dispatchOptions({ type: UPDATE_WARN_MODAL })
    }
    const answersCopy = structuredClone(answers)
    const LAST_ANSWERS_INDEX = answersCopy.length - 1

    const isCompleted = checkIfTheAttempIsCompleted({ arr: answersCopy, index: currentAttempt })
    const isWinner = checkForWin({ userWord: answersCopy[currentAttempt], wordToGuess: wordToGuess.word })

    // check winner or losser
    if (
      (currentLetter === 'enter' && isWinner) ||
    (currentAttempt === LAST_ANSWERS_INDEX && isCompleted && currentLetter === 'enter')
    ) {
      dispatchOptions({ type: UPDATE_IS_WINNER, payload: isWinner })
      setTimeout(() => {
        dispatchOptions({ type: UPDATE_ENDGAME_MODAL })
      }, 700)
    }

    // finish one attepmt
    if (currentLetter === 'enter' && isCompleted) {
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

    // remove last field
    if (currentLetter === 'borrar') {
      deleteLastField({ answersCopy })
      return
    }

    // error attempt incomplete
    if (currentLetter === 'enter' && !isCompleted && !endGameModal) {
      errorNotification({ errorMsg: 'Complete el intento' })
      return
    }

    // fiels complete error
    if (currentField > LAST_ANSWERS_INDEX) {
      errorNotification({ errorMsg: 'Todos los campos completos' })
      return
    }

    setNewLetter({ answersCopy, currentLetter })
  }

  return { handlePressKey, isUserWinner, currentAttempt, endGameModal, warnModal, answers }
}
