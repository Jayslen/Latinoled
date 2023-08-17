import { useEffect, useRef, useState } from 'react'
import { checkIfTheAttempIsFull, findFirstEmptyField } from '../../logic/userAnswersFunctions'

export function useBoardLogic() {
    const [answers, setAnswers] = useState([
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ])
    const currentAtttempt = useRef(0)
  
    const handleKeyPress = (e) => {
      const atttemptIndex = currentAtttempt.current
      const answersCopy = [...answers]
      const isFull = checkIfTheAttempIsFull({
        arr: answersCopy,
        index: atttemptIndex,
      })
      if (e.keyCode === 13 && isFull) {
        currentAtttempt.current = atttemptIndex + 1
      }
      if (isFull) return
      if (e.keyCode === 13) return
      if (e.key.match(/\d/gi)) return
      if (e.key.match(/\W/gi)) return
      const nextField = findFirstEmptyField({
        arr: answersCopy,
        index: atttemptIndex,
      })
      answersCopy[atttemptIndex][nextField] = e.key
      setAnswers(answersCopy)
    }
    useEffect(() => {
      window.document.addEventListener('keypress', handleKeyPress)
  
      return () => window.document.removeEventListener('keypress', handleKeyPress)
    }, [])
  
    return { answers }
  }