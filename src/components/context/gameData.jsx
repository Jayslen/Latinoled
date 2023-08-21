import { createContext, useReducer } from 'react'

export const GameData = createContext()
const initialState = {
  wordToGuess: 'paila',
  currentAttempt: 0,
  nextField: 0
}

function reducer (state, action) {
  if (action.type === 'word') {
    return {
      ...state,
      wordToGuess: 'bobo'
    }
  }
  //
}

export function GameDataProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
        <GameData.Provider value={{ state, dispatch }}>
            {children}
        </GameData.Provider>
  )
}
