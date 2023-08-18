import { useBoardLogic } from '../hook/useBoardLogic'

export function Board() {
  const { answers } = useBoardLogic()

  return (
    <main className="flex justify-center">
      <section className="h-96 flex flex-col items-center gap-4 mt-10">
        {answers.map((data, index) => {
          return (
            <article key={index} className="grid grid-cols-6 gap-2 w-96 h-96">
              {data.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="bg-[#ffffff60] h-full w-full rounded-md border flex justify-center items-center font-bold text-4xl uppercase"
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
