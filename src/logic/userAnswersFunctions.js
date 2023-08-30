import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION
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
  let delay = 250
  for (let i = 0; i < wordToGuess.length; i++) {
    const amountCurrentLetter = wordToGuess.filter(item => item === userWord[i])
    const amountCurrentLetterUser = data.filter(item => item.letter === userWord[i])

    if (userWord[i] === wordToGuess[i] && amountCurrentLetterUser.length < amountCurrentLetter.length) {
      data.push({
        letter: userWord[i],
        status: IS_SAME_POSITION,
        delay
      })
    } else if (wordToGuess.includes(userWord[i]) && amountCurrentLetterUser.length < amountCurrentLetter.length) {
      data.push({
        letter: userWord[i],
        status: IS_INCLUDED,
        delay
      })
    } else {
      data.push({
        letter: userWord[i],
        status: IS_NOT_INCLUDED,
        delay
      })
    }
    delay += 100
  }
  return data
}
