import dictionary from '../mocks/Diccionary.json'
export const getNewWord = ({ wordsList, country }) => {
  const wordIndex = Math.floor(Math.random() * dictionary[country].length)

  const newWord = dictionary[country][wordIndex]
  if (wordsList.length >= dictionary[country].length) {
    return undefined
  }
  if (!wordsList.includes(newWord)) {
    return newWord
  }
  return getNewWord({ wordsList, country })
}
