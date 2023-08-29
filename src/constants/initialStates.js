export const initialAnswers = () => {
  return (
    Array(5)
      .fill(null)
      .map(() => Array(6).fill(null))
  )
}
