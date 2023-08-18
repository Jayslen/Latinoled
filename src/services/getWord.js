import dicctionary from '../mocks/Diccionary.json'

export const getNewWord = () => {
  const randomNum = Math.floor(Math.random() * dicctionary.length)
  return dicctionary[randomNum]
}

export const checkWordRepeat = (word) => {
  const wordsInStorage = JSON.parse(
    localStorage.getItem('word-alredy-selected')
  )

  if (
    wordsInStorage &&
    wordsInStorage.filter((value) => value.word === word.word).length === 0
  ) {
    return word
  }

  getNewWord()
}
