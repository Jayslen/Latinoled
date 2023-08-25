import { createContext, useState } from 'react'
import { initialAnswers } from '../constants/initialStates'

export const UserAnswersContext = createContext()

export function UserAnswerProvider ({ children }) {
  const initialState = initialAnswers()
  const [answers, setAnswers] = useState(initialState)

  return <UserAnswersContext.Provider value={{ answers, setAnswers }}>{children}</UserAnswersContext.Provider>
}
