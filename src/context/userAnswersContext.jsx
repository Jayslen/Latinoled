import { createContext, useState } from 'react'
import { initialAnswers } from '../constants/initialStates'

export const UserAnswersContext = createContext()

export function UserAnswerProvider ({ children }) {
  const [answers, setAnswers] = useState(initialAnswers())

  return <UserAnswersContext.Provider value={{ answers, setAnswers }}>{children}</UserAnswersContext.Provider>
}
