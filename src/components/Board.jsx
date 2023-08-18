import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION,
} from '../const/positionsIndex'
import { useBoardLogic } from '../hook/useBoardLogic'

export function Board() {
  const { answers, lettersPosition } = useBoardLogic()

  return (
    <main className="flex justify-center">
      <section className="h-96 w-[350px] flex flex-col items-center gap-2 mt-10">
        {answers.map((rows, indexRow) => {
          const attempRows = lettersPosition[indexRow]
          return (
            <article
              key={indexRow}
              className="grid grid-cols-5 gap-2 w-full h-full"
            >
              {rows.map((data, index) => {
                const eachLetter = attempRows ? attempRows[index] : []
                const { status, transition } = eachLetter
                return (
                  <div
                    key={index}
                    className={`bg-[#ffffff60] text-white w-full h-full border-2 border-[#3a3a3c] flex justify-center items-center font-bold text-2xl uppercase rounded-lg ${
                      eachLetter.length !== 0
                        ? status === IS_SAME_POSITION
                          ? `bg-[#538d4e] animate-rotate-x animate-duration-[${transition}ms] border-0`
                          : status === IS_INCLUDED
                          ? `bg-[#b59f3b] animate-rotate-x animate-duration-[${transition}ms] border-0`
                          : status === IS_NOT_INCLUDED
                          ? `bg-[#3a3a3c] animate-rotate-x animate-duration-[${transition}ms] border-0`
                          : ''
                        : null
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
