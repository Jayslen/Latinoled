import { createContext, useReducer } from 'react'
import {
  UPDATE_FIELD,
  RESET_ATTEMPT,
  RESET_NEXT_FIELD,
  UPDATE_ATTEMPT,
  GO_ONE_FIELD_BACK,
  UPDATE_WORD,
  UPDATE_COUNTRY,
  UPDATE_GENERATE_NEW_WORD,
  SAVE_ATTEMPT_STORAGE,
  SAVE_FIELD_STORAGE,
  RESET_STREAK,
  UPDATE_STREAK,
  UPDATE_MAX_STREAK,
  UPDATE_TRIES,
  UPDATE_WINS,
  UPDATE_WINS_STORAGE
} from '../constants/reducerTypes'

export const UserGameData = createContext()
const initialState = {
  wordToGuess: '',
  country: 'republica dominicana',
  currentAttempt: 0,
  currentField: 0,
  streak: 0,
  tries: 0,
  winRate: 0,
  maxStreak: 0,
  generateNewWord: true
}

function reducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case UPDATE_ATTEMPT:
      return {
        ...state,
        currentAttempt: state.currentAttempt + 1
      }

    case UPDATE_FIELD:
      return {
        ...state,
        currentField: state.currentField + 1
      }

    case SAVE_ATTEMPT_STORAGE:
      return {
        ...state,
        currentAttempt: payload
      }

    case SAVE_FIELD_STORAGE:
      return {
        ...state,
        currentField: payload
      }

    case RESET_ATTEMPT:
      return {
        ...state,
        currentAttempt: 0
      }

    case RESET_NEXT_FIELD:
      return {
        ...state,
        currentField: 0
      }

    case GO_ONE_FIELD_BACK:
      return {
        ...state,
        currentField: state.currentField - 1
      }

    case UPDATE_WORD:
      return {
        ...state,
        wordToGuess: payload
      }

    case UPDATE_COUNTRY:
      return {
        ...state,
        country: payload
      }

    case UPDATE_GENERATE_NEW_WORD:
      return {
        ...state,
        generateNewWord: !state.generateNewWord
      }

    case UPDATE_STREAK:
      return {
        ...state,
        streak: state.streak + 1
      }

    case RESET_STREAK:
      return {
        ...state,
        streak: 0
      }
    case UPDATE_MAX_STREAK:
      return {
        ...state,
        maxStreak: payload || (state.streak > state.maxStreak ? state.streak : state.maxStreak)
      }
    case UPDATE_WINS:
      return {
        ...state,
        winRate: payload ? state.winRate + 1 : state.winRate
      }
    case UPDATE_TRIES:
      return {
        ...state,
        tries: payload || state.tries + 1
      }
    case UPDATE_WINS_STORAGE:
      return {
        ...state,
        winRate: payload
      }
    default:
      return state
  }
}

export function UserGameDataProvider ({ children }) {
  const [userData, dispatchUserData] = useReducer(reducer, initialState)

  return (
    <UserGameData.Provider value={{ userData, dispatchUserData }}>
      {children}
    </UserGameData.Provider>
  )
}
