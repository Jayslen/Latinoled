import { IS_INCLUDED, IS_SAME_POSITION } from '../constants/positionsIndex'

export function MiniBoard ({ board }) {
  return (
    <section className="flex flex-col items-center w-full gap-1 max-w-xs m-auto">
      {board.map((item, index) => {
        return (
          <ul key={index} className="grid grid-cols-5 w-full gap-2">
            {item.map((item, i) => {
              return (
                <li
                  key={i}
                  className={`p-3 font-bold text-xl rounded-lg uppercase text-white grid place-content-center sm:p-5 ${
                    item.status === IS_SAME_POSITION
                      ? 'bg-green-check'
                      : item.status === IS_INCLUDED
                      ? 'bg-yellow-check'
                      : 'bg-default-check'
                  }`}
                >
                  {item.letter}
                </li>
              )
            })}
          </ul>
        )
      })}
    </section>
  )
}
