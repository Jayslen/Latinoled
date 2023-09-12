import { useVirtualKey } from '../hook/useVirtualKeyLogic'

const firsLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdLine = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'borrar']

export function Keyboard () {
  const { handlePressKey } = useVirtualKey()

  return (
    <>
      <div className="flex flex-col gap-2 items-center text-white font-Poppins w-[350px]">
        <ul className="grid grid-flow-col gap-2">
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
        <ul className="grid grid-flow-col gap-2">
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
        <ul className="grid grid-flow-col gap-2">
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
      </div>
    </>
  )
}

function KeyBoardKey ({ letter, handleClick }) {
  return (
    <li
      className="dark:bg-dark-mode-text dark:text-light-mode-text text-dark-mode-text bg-light-mode-text w-10 h-12 rounded grid place-content-center text-xl font-semibold cursor-pointer uppercase select-none"
      onClick={handleClick}
    >
      {letter}
    </li>
  )
}
