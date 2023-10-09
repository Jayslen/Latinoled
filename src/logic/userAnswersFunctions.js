export const getUserWord = ({ userWord }) => {
  const word = []
  userWord.forEach((element) => {
    word.push(element.letter)
  })
  return word
}

export const checkIfTheAttempIsCompleted = ({ arr, index }) => {
  return arr[index]?.every((value) => value.letter !== null)
}

export const checkForWin = ({ wordToGuess, userWord }) => {
  const word = getUserWord({ userWord })
  return wordToGuess.toLowerCase() === word.join('').toLowerCase()
}
