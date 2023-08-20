const firsLine = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O']

export function Keyboard() {
  return (
    <div className="flex flex-col gap-2 text-white font-Poppins">
      <ul className="grid grid-flow-col gap-2">
        {firsLine.map((value) => {
          return <KeyBoardKey letter={value} />
        })}
      </ul>
    </div>
  )
}

function KeyBoardKey({ letter }) {
  return (
    <li className="bg-slate-500 w-10 h-12 rounded grid place-content-center text-xl font-semibold">
      {letter}
    </li>
  )
}
