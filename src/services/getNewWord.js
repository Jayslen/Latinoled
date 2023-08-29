import dicctionary from '../mocks/Diccionary.json'

export const getNewWord = (wordsList) => {
  const wordIndex = Math.floor(Math.random() * dicctionary.length)
  const newWord = dicctionary[wordIndex]
  if (!wordsList.includes(newWord)) {
    return newWord
  }
  if (wordsList.length === dicctionary.length) {
    return undefined
  }
  return getNewWord(wordsList)
}
