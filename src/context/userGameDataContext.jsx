import { createContext, useReducer } from 'react'
import {
  UPDATE_FIELD,
  RESET_ATTEMPT,
  RESET_NEXT_FIELD,
  UPDATE_ATTEMPT,
  GO_ONE_FIELD_BACK,
  UPDATE_WORD,
  UPDATE_COUNTRY,
  UPDATE_GENERATE_NEW_WORD
} from '../constants/reducerTypes'

export const UserGameData = createContext()
const initialState = {
  wordToGuess: '',
  country: 'republica dominicana',
  currentAttempt: 0,
  currentField: 0,
  generateNewWord: true
}

function reducer (state, action) {
  const { type, payload } = action
  if (type === UPDATE_ATTEMPT) {
    return {
      ...state,
      currentAttempt: state.currentAttempt + 1
    }
  }

  if (type === UPDATE_FIELD) {
    return {
      ...state,
      currentField: state.currentField + 1
    }
  }

  if (type === RESET_ATTEMPT) {
    return {
      ...state,
      currentAttempt: 0
    }
  }

  if (type === RESET_NEXT_FIELD) {
    return {
      ...state,
      currentField: 0
    }
  }
  if (type === GO_ONE_FIELD_BACK) {
    return {
      ...state,
      currentField: state.currentField - 1
    }
  }
  if (type === UPDATE_WORD) {
    return {
      ...state,
      wordToGuess: payload
    }
  }

  if (type === UPDATE_COUNTRY) {
    return {
      ...state,
      country: payload
    }
  }

  if (type === UPDATE_GENERATE_NEW_WORD) {
    return {
      ...state,
      generateNewWord: !state.generateNewWord
    }
  }
}

export function UserGameDataProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserGameData.Provider value={{ state, dispatch }}>
      {children}
    </UserGameData.Provider>
  )
}
