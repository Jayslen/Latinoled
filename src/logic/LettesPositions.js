import {
  IS_SAME_POSITION,
  IS_INCLUDED,
  IS_NOT_INCLUDED
} from '../constants/positionsIndex'
import { getUserWord } from './userAnswersFunctions'

export const findLettersPositions = ({ wordToGuess, currentWord, attempt, answers }) => {
  const data = []
  const userWord = getUserWord({ userWord: currentWord })

  for (let i = 0; i < wordToGuess.length; i++) {
    if (userWord[i] === wordToGuess[i]) {
      data.push({
        letter: userWord[i],
        status: IS_SAME_POSITION
      })
    } else if (wordToGuess.includes(userWord[i])) {
      data.push({
        letter: userWord[i],
        status: IS_INCLUDED
      })
    } else {
      data.push({
        letter: userWord[i],
        status: IS_NOT_INCLUDED
      })
    }
  }

  // delete repeat includes letters
  for (let i = 0; i < data.length; i++) {
    const amount = wordToGuess.filter((item) => item === userWord[i]).length
    const current = data.filter((item) => item.letter === userWord[i]).length
    const includes = data.filter(
      (item) => item.status === IS_SAME_POSITION && item.letter === userWord[i]
    ).length

    if (includes === amount) {
      data
        .filter(
          (item) => item.letter === userWord[i] && item.status === IS_INCLUDED
        )
        .map((value) => (value.status = IS_NOT_INCLUDED))
    }

    if (includes > 0) {
      data
        .filter(
          (item) => item.letter === userWord[i] && item.status === IS_INCLUDED
        )
        .slice(1)
        .map((value) => (value.status = IS_NOT_INCLUDED))
    }

    // includes.length !== amount.length
    if (current > amount && includes === 0) {
      data
        .filter(
          (item) => item.letter === userWord[i] && item.status === IS_INCLUDED
        )
        .slice(amount)
        .map((value) => (value.status = IS_NOT_INCLUDED))
    }
  }
  answers[attempt].forEach((elm, index) => {
    elm.letter = data[index].letter
    elm.status = data[index].status
  })
}
