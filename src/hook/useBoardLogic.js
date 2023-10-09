import { useEffect, useContext } from 'react'
import { UserAnswersContext } from '../context/userAnswersContext'
import { UserGameData } from '../context/userGameDataContext'
import { GameData } from '../context/gameDataContext'
import { useUpdateStates } from './useUpdateGloblaStates'
import { UPDATE_WARN_MODAL } from '../constants/gameOptionsReducerTypes'
import { checkForWin, checkIfTheAttempIsCompleted } from '../logic/userAnswersFunctions'
import { errorNotification } from '../components/notifications/tostifyNotification'
import dictionary from '../mocks/Diccionary.json'

export function useBoardLogic () {
  const { answers } = useContext(UserAnswersContext)
  const { userData: { currentField, wordToGuess, currentAttempt, country } } = useContext(UserGameData)
  const { gameInfo: { endGameModal, warnModal, wordsPlayed }, dispatchGameInfo } = useContext(GameData)
  const { setNewLetter, deleteLastField, finishAttempt, checkWinLostGame } = useUpdateStates()

  const handleKeyPress = (e) => {
    if (wordsPlayed.length >= dictionary[country].length) {
      dispatchGameInfo({ type: UPDATE_WARN_MODAL })
      return
    }

    if (endGameModal || warnModal) return
    const answersCopy = structuredClone(answers)
    const LAST_ATTEMPT = answersCopy.length - 1
    const LAST_FIELD = answersCopy[0].length - 1
    const isCompleted = checkIfTheAttempIsCompleted({ arr: answersCopy, index: currentAttempt })
    const isWinner = checkForWin({ userWord: answersCopy[currentAttempt], wordToGuess: wordToGuess.word })

    // check for winner or lost game
    if ((e.keyCode === 13 && isWinner) || (currentAttempt === LAST_ATTEMPT && isCompleted && e.keyCode === 13)) {
      checkWinLostGame({ isUserWinner: isWinner, answersCopy })
      return
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
    if (currentField > LAST_FIELD && e.key.length === 1) {
      errorNotification({ errorMsg: 'Todos los campos completos' })
      return
    }

    if (e.key.length > 1) return

    setNewLetter({ answersCopy, currentLetter: e.key.toLowerCase() })
  }

  // type a letter
  useEffect(() => {
    window.document.body.addEventListener('keydown', handleKeyPress)

    return () =>
      window.document.body.removeEventListener('keydown', handleKeyPress)
  })

  return { answers }
}
