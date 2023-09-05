export const checkIfTheAttempIsCompleted = ({ arr, index }) => {
  return arr[index].every((value) => value !== null)
}

export const checkForWin = ({ wordToGuess, userWord }) => {
  return wordToGuess.toLowerCase() === userWord.toLowerCase()
}

export const checkAnswersStorage = ({ storage }) => {
  if (!storage) return
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].includes(null)) {
      return true
    }
  }
}
