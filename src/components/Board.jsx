import { AnimatePresence } from 'framer-motion'
import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION
} from '../constants/positionsIndex'
import { useBoardLogic } from '../hook/useBoardLogic'
import { GameMoldal } from './EndGameModal'

export function Board () {
  const { answers, lettersPosition, openModal, isUserWinner, currentAttempt, boardExample, resetAttempt } = useBoardLogic()
  const delay = ['1000ms', '2000ms', '3000ms', '4000ms', '5000ms']

  return (
    <>
      <section className="h-96 w-[350px] flex flex-col items-center gap-2 mt-10 font-Poppins">
        {answers.map((rows, indexRow) => {
          const attempRows = lettersPosition[indexRow]
          return (
            <article
              key={indexRow}
              className="grid grid-cols-5 gap-2 w-full h-full"
            >
              {rows.map((data, index) => {
                const eachLetter = attempRows ? attempRows[index] : []
                const { status } = eachLetter
                return (
                  <div
                    key={index}
                    className={`bg-[#ffffff60] text-white w-full h-full border-[#3a3a3c] flex justify-center items-center font-bold text-2xl uppercase rounded-md border-2  transition-colors duration-500 animate-duration-700 animate-delay-[${delay[index]}] animate-once animate-ease-linear ${
                      eachLetter.length !== 0
                        ? status === IS_SAME_POSITION
                          ? 'bg-[rgb(83,141,78)] animate-rotate-x'
                          : status === IS_INCLUDED
                          ? 'bg-[rgb(181,159,59)] animate-rotate-x'
                          : status === IS_NOT_INCLUDED
                          ? 'bg-[rgb(58,58,60)] animate-rotate-x'
                          : null
                        : 'bg-transparent'
                    }`}
                  >
                    {data}
                  </div>
                )
              })}
            </article>
          )
        })}
        <AnimatePresence>
          {openModal && <GameMoldal resetAttempt={resetAttempt} isWinner={isUserWinner} attempt={currentAttempt} board={boardExample} />}
        </AnimatePresence>
      </section>
    </>
  )
}
