import { ToastContainer } from 'react-toastify'
import {
  IS_INCLUDED,
  IS_NOT_INCLUDED,
  IS_SAME_POSITION
} from '../constants/positionsIndex'
import { useBoardLogic } from '../hook/useBoardLogic'

export function Board () {
  const { answers } = useBoardLogic()

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
      <section className="h-80 w-full flex flex-col items-center gap-2 font-Poppins sm:h-[400px]">
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

      </section>
    </>
  )
}
