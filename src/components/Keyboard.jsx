import { useVirtualKey } from '../hook/useVirtualKeyLogic'
import { motion } from 'framer-motion'

const firsLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdLine = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

export function Keyboard () {
  const { handlePressKey } = useVirtualKey()

  return (
    <>
      <div className="grid grid-rows-3 place-content-center place-items-center gap-2 text-white font-Poppins w-full">
        <ul className="flex gap-1 sm:gap-1.5">
          {firsLine.map((value, index) => {
            return (
              <KeyBoardKey
                letter={value.toLocaleLowerCase()}
                key={index}
                handleClick={handlePressKey}
              />
            )
          })}
        </ul>
        <ul className="flex gap-1 sm:gap-1.5">
          {secondLine.map((value, index) => {
            return (
              <KeyBoardKey
                letter={value.toLocaleLowerCase()}
                key={index}
                handleClick={handlePressKey}
              />
            )
          })}
        </ul>
        <ul className="flex gap-1 sm:gap-1.5">
          {thirdLine.map((value, index) => {
            return (
              <KeyBoardKey
                letter={value.toLocaleLowerCase()}
                key={index}
                handleClick={handlePressKey}
              />
            )
          })}
        </ul>
        <div className='w-[190px] sm:w-[250px] flex justify-between gap-1'>
          <Buttons functionality={'enter'} handleClick={handlePressKey}>
            Enter
          </Buttons>
          <Buttons functionality={'delete'} handleClick={handlePressKey}>
            Borrar
          </Buttons>
        </div>
      </div>
    </>
  )
}

function KeyBoardKey ({ letter, handleClick }) {
  return (
    <motion.li
      whileTap={{ scale: 0.9 }}
      className="dark:bg-dark-mode-text dark:text-light-mode-text text-dark-mode-text bg-light-mode-text  w-7 h-10 sm:w-9 sm:h-12 rounded grid place-content-center text-xl font-semibold cursor-pointer uppercase select-none"
      onClick={handleClick}
    >
      {letter}
    </motion.li>
  )
}

function Buttons ({ children, functionality, handleClick }) {
  return (
    <motion.button whileTap={{ scale: 0.9 }} className='dark:bg-dark-mode-text dark:text-light-mode-text text-dark-mode-text bg-light-mode-text w-full rounded py-3 grid place-content-center' data-functionality={functionality} onClick={handleClick}>
    {children}
  </motion.button>
  )
}
