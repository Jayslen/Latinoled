import { createContext, useReducer } from 'react'
import { UPDATE_FIELD, RESET_ATTEMPT, RESET_NEXT_FIELD, UPDATE_ATTEMPT } from '../../constants/reducerTypes'

export const GameData = createContext()
const initialState = {
  wordToGuess: 'paila',
  currentAttempt: 0,
  nextField: 0
}

function reducer (state, action) {
  const { type } = action
  if (type === UPDATE_ATTEMPT) {
    return {
      ...state,
      currentAttempt: state.currentAttempt + 1
    }
  }

  if (type === UPDATE_FIELD) {
    return {
      ...state,
      nextField: state.nextField + 1
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
      nextField: 0
    }
  }
}

export function GameDataProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
        <GameData.Provider value={{ state, dispatch }}>
            {children}
        </GameData.Provider>
  )
}
