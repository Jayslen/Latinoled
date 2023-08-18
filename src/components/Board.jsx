import { useBoardLogic } from '../hook/useBoardLogic'

export function Board() {
  const { answers, lettersSamePosition, wordToGuess } = useBoardLogic()

  return (
    <main className="flex justify-center">
      <section className="h-96 flex flex-col items-center gap-4 mt-10">
        {answers.map((rows, indexRow) => {
          const attempRows = lettersSamePosition[indexRow]
          return (
            <article
              key={indexRow}
              className="grid grid-cols-6 gap-2 w-96 h-96"
            >
              {rows.map((data, index) => {
                const eachLetter = attempRows ? attempRows[index] : []
                // const letter = eachLetter?.letter
                // const row = eachLetter?.row
                // const status = eachLetter?.status
                // const transition = eachLetter?.transition
                const { row, status, transition } = eachLetter
                return (
                  <div
                    key={index}
                    className={`bg-[#ffffff60] h-full w-full rounded-md border flex justify-center items-center font-bold text-4xl uppercase ${
                      eachLetter.length === 0
                        ? ''
                        : wordToGuess.split('')[index] === answers[row][index]
                        ? `bg-green-400 transition-colors animate-rotate-x animate-delay-[${transition}ms]`
                        : ''
                    }`}
                  >
                    {data}
                  </div>
                )
              })}
            </article>
          )
        })}
      </section>
    </main>
  )
}
