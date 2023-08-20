import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION,
} from '../constants/positionsIndex'

export const checkIfTheAttempIsCompleted = ({ arr, index }) => {
  return arr[index].every((value) => value !== null)
}

export const checkForWin = ({ wordToGuess, userWord }) => {
  return wordToGuess.toLowerCase() === userWord.toLowerCase()
}

// check what letters the word includes
export const findLettersPositions = ({ wordToGuess, userWord }) => {
  const data = []
  let transition = 250
  for (let i = 0; i < wordToGuess.length; i++) {
    if (userWord[i] === wordToGuess[i]) {
      data.push({
        letter: userWord[i],
        status: IS_SAME_POSITION,
        transition,
      })
    } else if (!wordToGuess.includes(userWord[i])) {
      data.push({
        letter: userWord[i],
        status: IS_NOT_INCLUDED,
        transition,
      })
    } else {
      data.push({
        letter: userWord[i],
        status: IS_INCLUDED,
        transition,
      })
    }
    transition += 100
  }
  return data
}
