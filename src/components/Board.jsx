import { AnimatePresence } from 'framer-motion'
import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION
} from '../constants/positionsIndex'
import { useBoardLogic } from '../hook/useBoardLogic'
import { GameMoldal } from './EndGameModal'

export function Board () {
  const { answers, openModal, isUserWinner, currentAttempt, resetAttempt } =
    useBoardLogic()
  const miniBoard = answers.slice(0, currentAttempt)

  return (
    <>
      <section className="h-96 w-[350px] flex flex-col items-center gap-2 font-Poppins">
        {answers.map((rows, indexRow) => {
          return (
            <article
              key={indexRow}
              className="grid grid-cols-5 gap-2 w-full h-full"
            >
              {rows.map((data, index) => {
                return (
                  <div
                    key={index}
                    className={`text-light-mode-text w-full h-full border-[#3a3a3c] flex justify-center items-center font-bold text-2xl uppercase rounded-md border-2  transition-colors duration-500 animate-duration-700 animate-once animate-ease-linear dark:text-dark-mode-text ${
                      data.status === IS_SAME_POSITION
                        ? 'bg-green-check animate-rotate-x border-none text-gray-50'
                        : data.status === IS_INCLUDED
                        ? 'bg-yellow-check animate-rotate-x border-none text-gray-50'
                        : data.status === IS_NOT_INCLUDED
                        ? 'bg-default-check animate-rotate-x border-none text-gray-50'
                        : null
                    }`}
                  >
                    {data?.letter}
                  </div>
                )
              })}
            </article>
          )
        })}
        <AnimatePresence>
          {openModal && (
            <GameMoldal
              resetAttempt={resetAttempt}
              isWinner={isUserWinner}
              attempt={currentAttempt}
              board={miniBoard}
            />
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
