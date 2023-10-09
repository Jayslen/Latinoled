import { useContext } from 'react'
import { GameData } from '../context/gameDataContext'
import { UserGameData } from '../context/userGameDataContext'
import { UserAnswersContext } from '../context/userAnswersContext'
import { useUpdateStates } from './useUpdateGloblaStates'
import { checkForWin, checkIfTheAttempIsCompleted } from '../logic/userAnswersFunctions'
import { UPDATE_WARN_MODAL } from '../constants/gameOptionsReducerTypes'
import { errorNotification } from '../components/notifications/tostifyNotification'
import dictionary from '../mocks/Diccionary.json'

export function useVirtualKey () {
  const { answers } = useContext(UserAnswersContext)
  const { userData: { currentField, wordToGuess, currentAttempt, country } } = useContext(UserGameData)
  const { gameInfo: { endGameModal, wordsPlayed }, dispatchOptions } = useContext(GameData)
  const { setNewLetter, deleteLastField, checkWinLostGame, finishAttempt } = useUpdateStates()

  const handlePressKey = (e) => {
    const currentLetter = e.target.textContent.toLowerCase()

    if (dictionary[country].length === wordsPlayed.length) {
      dispatchOptions({ type: UPDATE_WARN_MODAL })
    }
    const answersCopy = structuredClone(answers)
    const LAST_ATTEMPT = answersCopy.length - 1
    const LAST_FIELD = answersCopy[0].length - 1

    const isCompleted = checkIfTheAttempIsCompleted({ arr: answersCopy, index: currentAttempt })
    const isWinner = checkForWin({ userWord: answersCopy[currentAttempt], wordToGuess: wordToGuess.word })

    // check winner or losser
    if ((currentLetter === 'enter' && isWinner) ||
        (currentAttempt === LAST_ATTEMPT &&
        isCompleted && currentLetter === 'enter')
    ) {
      checkWinLostGame({ isUserWinner: isWinner })
      return
    }

    // finish one attepmt
    if (currentLetter === 'enter' && isCompleted) {
      finishAttempt({ answersCopy })
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
    if (currentField > LAST_FIELD) {
      errorNotification({ errorMsg: 'Todos los campos completos' })
      return
    }

    setNewLetter({ answersCopy, currentLetter })
  }

  return { handlePressKey }
}
