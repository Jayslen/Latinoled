import { createContext, useReducer } from 'react'
import { CLEAR_WORDS_PLAYED, UPDATE_ENDGAME_MODAL, UPDATE_IS_WINNER, UPDATE_WARN_MODAL, UPDATE_WORDS_PLAYED } from '../constants/gameOptionsReducerTypes'

export const GameData = createContext()
const country = window.localStorage.getItem('country')
const wordsInStorage = JSON.parse(localStorage.getItem(`${country}-words-played`))

const initialState = {
  endGameModal: false,
  warnModal: false,
  isUserWinner: false,
  wordsPlayed: wordsInStorage?.length > 0 ? wordsInStorage : []
}

function reducer (state, action) {
  const { type, payload } = action

  if (type === UPDATE_ENDGAME_MODAL) {
    return { ...state, endGameModal: !state.endGameModal }
  }

  if (type === UPDATE_WARN_MODAL) {
    return { ...state, warnModal: !state.warnModal }
  }

  if (type === UPDATE_IS_WINNER) {
    return { ...state, isUserWinner: payload }
  }

  if (type === UPDATE_WORDS_PLAYED) {
    return { ...state, wordsPlayed: payload }
  }

  if (type === CLEAR_WORDS_PLAYED) {
    return { ...state, wordsPlayed: [] }
  }
}

export function GameDataProvider ({ children }) {
  const [gameInfo, dispatchGameInfo] = useReducer(reducer, initialState)

  return (
      <GameData.Provider value={{ gameInfo, dispatchGameInfo }}>
        {children}
      </GameData.Provider>

  )
}
