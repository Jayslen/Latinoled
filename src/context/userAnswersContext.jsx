import { createContext, useState } from 'react'
import { initialAnswers } from '../constants/initialStates'

export const UserAnswersContext = createContext()
const initialState = initialAnswers()

export function UserAnswerProvider ({ children }) {
  const [answers, setAnswers] = useState(initialState)

  return <UserAnswersContext.Provider value={{ answers, setAnswers }}>{children}</UserAnswersContext.Provider>
}
