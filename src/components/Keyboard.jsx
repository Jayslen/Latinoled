const firsLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const secondLine = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const thirdLine = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

export function Keyboard () {
  return (
    <div className="flex flex-col gap-2 items-center text-white font-Poppins w-[350px] mt-5">
      <ul className="grid grid-flow-col gap-2">
        {firsLine.map((value, index) => {
          return <KeyBoardKey letter={value.toLocaleLowerCase()} key={index} />
        })}
      </ul>
      <ul className="grid grid-flow-col gap-2">
        {secondLine.map((value, index) => {
          return <KeyBoardKey letter={value.toLocaleLowerCase()} key={index} />
        })}
      </ul>
      <ul className="grid grid-flow-col gap-2">
        {thirdLine.map((value, index) => {
          return <KeyBoardKey letter={value.toLocaleLowerCase()} key={index} />
        })}
      </ul>
    </div>
  )
}

function KeyBoardKey ({ letter }) {
  const handleClick = (e) => {
    console.log(e.target.textContent)
  }
  return (
    <li
      className="dark:bg-dark-mode-text dark:text-light-mode-text text-dark-mode-text bg-light-mode-text w-10 h-12 rounded grid place-content-center text-xl font-semibold cursor-pointer uppercase"
      onClick={handleClick}
    >
      {letter}
    </li>
  )
}
