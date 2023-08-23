export const initialAnswers = () => {
  return (
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(null))
  )
}
