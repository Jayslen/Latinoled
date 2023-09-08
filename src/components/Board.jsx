import { AnimatePresence } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION
} from '../constants/positionsIndex'
import { useBoardLogic } from '../hook/useBoardLogic'
import { GameMoldal } from './modal/EndGameModal'

export function Board () {
  const { answers, openModal, isUserWinner, currentAttempt, resetAttempt } =
    useBoardLogic()
  const miniBoard = answers.slice(0, currentAttempt)

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className="h-80 w-full px-2 flex flex-col items-center gap-2 font-Poppins sm:w-[350px] sm:h-[400px] sm:p-0">
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
                        ? 'bg-green-check animate-rotate-x border-none text-white'
                        : data.status === IS_INCLUDED
                        ? 'bg-yellow-check animate-rotate-x border-none text-white'
                        : data.status === IS_NOT_INCLUDED
                        ? 'bg-default-check animate-rotate-x border-none text-white'
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
