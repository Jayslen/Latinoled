export const checkIfTheAttempIsCompleted = ({arr, index}) => {
  return arr[index].every((value) => value !== null)
}

export const findCurrentAttemptIndex = (arr = []) => {
    let index
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].some((value) => value === null)) {
        index = i
        return index
      }
    }
  }

  export const findFirstEmptyField = ({ index, arr = [] }) => {
    for (let i = 0; i <= arr.length; i++) {
      if (arr[index][i] === null) {
        return i
      }
    }
  }

  export const checkForWin = ({wordToGuess, userWord}) => {
   return wordToGuess.toLowerCase() === userWord.toLowerCase()
  }