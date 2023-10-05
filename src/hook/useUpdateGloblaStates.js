import { useContext } from 'react'
import { UserGameData } from '../context/userGameDataContext'
import { GameData } from '../context/gameDataContext'
import { UserAnswersContext } from '../context/userAnswersContext'
import { GO_ONE_FIELD_BACK, RESET_ATTEMPT, RESET_NEXT_FIELD, UPDATE_ATTEMPT, UPDATE_FIELD, UPDATE_GENERATE_NEW_WORD, RESET_STREAK, UPDATE_STREAK } from '../constants/reducerTypes'
import { CLEAR_WORDS_PLAYED, UPDATE_ENDGAME_MODAL, UPDATE_IS_WINNER, UPDATE_WARN_MODAL } from '../constants/gameOptionsReducerTypes'
import { initialAnswers } from '../constants/initialStates'
import { succesNotification } from '../components/notifications/tostifyNotification'
import { findLettersPositions } from '../logic/LettesPositions'

export function useUpdateStates () {
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { state: { currentField, wordToGuess, currentAttempt, country }, dispatch } = useContext(UserGameData)
  const { gameInfo: { wordsPlayed }, dispatchGameInfo } = useContext(GameData)

  const resetAttempt = () => {
    setAnswers(initialAnswers())
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: RESET_ATTEMPT })
    dispatchGameInfo({ type: UPDATE_ENDGAME_MODAL })
    dispatch({ type: UPDATE_GENERATE_NEW_WORD })
    window.localStorage.setItem(`${country}-words-played`, JSON.stringify(wordsPlayed))
    localStorage.savedMatch = null
  }

  const clearWordsPlayed = () => {
    dispatchGameInfo({ type: CLEAR_WORDS_PLAYED })
    dispatchGameInfo({ type: UPDATE_WARN_MODAL })
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: RESET_ATTEMPT })
    setAnswers(initialAnswers())
    window.localStorage.setItem(`${country}-words-played`, JSON.stringify([]))
    succesNotification({ successMsg: 'Registro limpio' })
  }

  const setNewLetter = ({ answersCopy, currentLetter }) => {
    answersCopy[currentAttempt][currentField].letter = currentLetter
    setAnswers(answersCopy)
    dispatch({ type: UPDATE_FIELD })
  }

  const deleteLastField = ({ answersCopy }) => {
    if (currentField === 0) return
    answersCopy[currentAttempt][currentField - 1].letter = null
    setAnswers(answersCopy)
    dispatch({ type: GO_ONE_FIELD_BACK })
  }

  const finishAttempt = ({ answersCopy }) => {
    findLettersPositions({
      wordToGuess: wordToGuess.word.split(''),
      currentWord: answers[currentAttempt],
      attempt: currentAttempt,
      answers: answersCopy
    })
    dispatch({ type: RESET_NEXT_FIELD })
    dispatch({ type: UPDATE_ATTEMPT })
    localStorage.setItem('savedMatch', JSON.stringify({ savedAnswers: answersCopy, savedAttempt: currentAttempt + 1, savedField: 0, savedWord: wordToGuess }))
    setAnswers(answersCopy)
  }

  const checkWinLostGame = ({ isUserWinner }) => {
    dispatchGameInfo({ type: UPDATE_IS_WINNER, payload: isUserWinner })
    setTimeout(() => {
      dispatchGameInfo({ type: UPDATE_ENDGAME_MODAL })
    }, 700)
  }

  const updateStreak = ({ isUserWinner }) => {
    if (isUserWinner) {
      dispatch({ type: UPDATE_STREAK })
    } else {
      dispatch({ type: RESET_STREAK })
    }
  }

  return { resetAttempt, clearWordsPlayed, setNewLetter, deleteLastField, finishAttempt, checkWinLostGame, updateStreak }
}
