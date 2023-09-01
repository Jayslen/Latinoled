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
  for (let i = 0; i < wordToGuess.length; i++) {
    if (userWord[i] === wordToGuess[i]) {
      data.push({
        letter: userWord[i],
        status: IS_SAME_POSITION,
        index: i
      })
    } else if (wordToGuess.includes(userWord[i])) {
      data.push({
        letter: userWord[i],
        status: IS_INCLUDED,
        index: i
      })
    } else {
      data.push({
        letter: userWord[i],
        status: IS_NOT_INCLUDED,
        index: i
      })
    }
  }

  for (let i = 0; i < data.length; i++) {
    const amount = wordToGuess.filter((item) => item === userWord[i])
    const current = data.filter((item) => item.letter === userWord[i])
    const includes = data.filter(
      (item) => item.status === IS_SAME_POSITION && item.letter === userWord[i]
    )

    if (includes.length === amount.length) {
      data
        .filter((item) => item.letter === userWord[i] && item.status === IS_INCLUDED)
        .map((value) => (value.status = IS_NOT_INCLUDED))
    }

    if (current.length > amount.length && includes.length !== amount.length) {
      data
        .filter((item) => item.letter === userWord[i])
        .slice(current.length - amount.length - 1)
        .map((value) => (value.status = IS_NOT_INCLUDED))
    }
  }
  return data
}
