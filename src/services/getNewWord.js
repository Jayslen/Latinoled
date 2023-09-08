import dicctionary from '../mocks/Diccionary.json'
export const getNewWord = ({ wordsList, country }) => {
  const wordIndex = Math.floor(
    Math.random() * dicctionary[country].length
  )
  const newWord = dicctionary[country][wordIndex]
  if (!wordsList.includes(newWord)) {
    return newWord
  }
  if (wordsList.length === dicctionary.length) {
    return undefined
  }
  return getNewWord({ wordsList, country })
}
