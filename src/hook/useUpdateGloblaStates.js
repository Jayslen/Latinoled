import { useContext, useEffect, useRef } from 'react'
import { UserGameData } from '../context/userGameDataContext'
import { GameData } from '../context/gameDataContext'
import { UserAnswersContext } from '../context/userAnswersContext'
import {
  GO_ONE_FIELD_BACK,
  RESET_ATTEMPT,
  RESET_NEXT_FIELD,
  UPDATE_ATTEMPT,
  UPDATE_FIELD,
  UPDATE_GENERATE_NEW_WORD,
  RESET_STREAK,
  UPDATE_STREAK,
  UPDATE_MAX_STREAK,
  UPDATE_WINS,
  UPDATE_TRIES,
  UPDATE_WORD,
  SAVE_ATTEMPT_STORAGE,
  SAVE_FIELD_STORAGE,
  UPDATE_WINS_STORAGE
} from '../constants/reducerTypes'
import {
  CLEAR_WORDS_PLAYED,
  UPDATE_ENDGAME_MODAL,
  UPDATE_IS_WINNER,
  UPDATE_WARN_MODAL,
  UPDATE_WORDS_PLAYED
} from '../constants/gameOptionsReducerTypes'
import { initialAnswers } from '../constants/initialStates'
import { succesNotification } from '../components/notifications/tostifyNotification'
import { findLettersPositions } from '../logic/LettesPositions'
import { getNewWord } from '../services/getNewWord'

export function useUpdateStates () {
  const { answers, setAnswers } = useContext(UserAnswersContext)
  const { userData: { currentField, wordToGuess, currentAttempt, country, generateNewWord, tries, maxStreak, winRate }, dispatchUserData } = useContext(UserGameData)
  const { gameInfo: { wordsPlayed, isUserWinner }, dispatchGameInfo } = useContext(GameData)
  const isFirsRender = useRef(true)

  const updateStats = () => {
    if (isUserWinner) {
      dispatchUserData({ type: UPDATE_STREAK })
    } else {
      dispatchUserData({ type: RESET_STREAK })
    }
    dispatchUserData({ type: UPDATE_MAX_STREAK })
    dispatchUserData({ type: UPDATE_WINS, payload: isUserWinner })
    dispatchUserData({ type: UPDATE_TRIES })
  }

  const resetAttempt = () => {
    setAnswers(initialAnswers())
    dispatchUserData({ type: RESET_NEXT_FIELD })
    dispatchUserData({ type: RESET_ATTEMPT })
    dispatchGameInfo({ type: UPDATE_ENDGAME_MODAL })
    dispatchUserData({ type: UPDATE_GENERATE_NEW_WORD })
    window.localStorage.setItem(
      `${country}-words-played`,
      JSON.stringify(wordsPlayed)
    )
    localStorage.savedMatch = null

    updateStats()
  }

  const clearWordsPlayed = () => {
    dispatchGameInfo({ type: CLEAR_WORDS_PLAYED })
    dispatchGameInfo({ type: UPDATE_WARN_MODAL })
    dispatchUserData({ type: RESET_NEXT_FIELD })
    dispatchUserData({ type: RESET_ATTEMPT })
    setAnswers(initialAnswers())
    window.localStorage.setItem(`${country}-words-played`, JSON.stringify([]))
    succesNotification({ successMsg: 'Registro limpio' })
    localStorage.savedMatch = null
  }

  const setNewLetter = ({ answersCopy, currentLetter }) => {
    answersCopy[currentAttempt][currentField].letter = currentLetter
    setAnswers(answersCopy)
    dispatchUserData({ type: UPDATE_FIELD })
  }

  const deleteLastField = ({ answersCopy }) => {
    if (currentField === 0) return
    answersCopy[currentAttempt][currentField - 1].letter = null
    setAnswers(answersCopy)
    dispatchUserData({ type: GO_ONE_FIELD_BACK })
  }

  const finishAttempt = ({ answersCopy }) => {
    findLettersPositions({
      wordToGuess: wordToGuess.word.split(''),
      currentWord: answers[currentAttempt],
      attempt: currentAttempt,
      answers: answersCopy
    })
    dispatchUserData({ type: RESET_NEXT_FIELD })
    dispatchUserData({ type: UPDATE_ATTEMPT })
    localStorage.setItem(
      'savedMatch',
      JSON.stringify({
        savedAnswers: answersCopy,
        savedAttempt: currentAttempt + 1,
        savedField: 0,
        savedWord: wordToGuess
      })
    )
    setAnswers(answersCopy)
  }

  const checkWinLostGame = ({ isUserWinner }) => {
    dispatchGameInfo({ type: UPDATE_IS_WINNER, payload: isUserWinner })
    setTimeout(() => {
      dispatchGameInfo({ type: UPDATE_ENDGAME_MODAL })
    }, 700)
    localStorage.savedMatch = null
    isFirsRender.current = false
  }

  // generate new word

  useEffect(() => {
    const newWord = getNewWord({ wordsList: wordsPlayed, country })

    if (newWord === undefined) return

    dispatchUserData({ type: UPDATE_WORD, payload: newWord })
    dispatchGameInfo({ type: UPDATE_WORDS_PLAYED, payload: newWord })
  }, [generateNewWord])

  // save stats in local storage

  useEffect(() => {
    if (isFirsRender.current) return
    const stats = { tries, maxStreak, winRate }
    localStorage.setItem('stats', JSON.stringify(stats))
  }, [tries, winRate, maxStreak])

  // update match and stats if there are data in storage

  useEffect(() => {
    window.localStorage.setItem('country', country)
    const matchStorage = JSON.parse(localStorage.getItem('savedMatch'))
    const savedStats = JSON.parse(localStorage.getItem('stats'))

    if (matchStorage) {
      setAnswers(matchStorage.savedAnswers)
      dispatchUserData({
        type: SAVE_ATTEMPT_STORAGE,
        payload: matchStorage.savedAttempt
      })
      dispatchUserData({ type: SAVE_FIELD_STORAGE, payload: matchStorage.savedField })
      dispatchUserData({ type: UPDATE_WORD, payload: matchStorage.savedWord })
    }

    if (savedStats) {
      const { tries, maxStreak, winRate } = savedStats
      dispatchUserData({ type: UPDATE_TRIES, payload: tries })
      dispatchUserData({ type: UPDATE_WINS_STORAGE, payload: winRate })
      dispatchUserData({ type: UPDATE_MAX_STREAK, payload: maxStreak })
    }
  }, [])

  return {
    resetAttempt,
    clearWordsPlayed,
    setNewLetter,
    deleteLastField,
    finishAttempt,
    checkWinLostGame
  }
}
