import dicctionary from '../mocks/Diccionary.json'

export const getNewWord = () => {
  const WORDS_PLAYED = localStorage.getItem('words-played-by-user')
  const wordIndex = Math.floor(Math.random() * dicctionary.length)
  const newWord = dicctionary[wordIndex]
  if (!dicctionary.includes(newWord)) {
    return newWord
  }

  return getNewWord
}
