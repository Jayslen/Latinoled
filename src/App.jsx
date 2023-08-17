import { useState } from 'react'
import { GithubIcon, InfoIcon } from './components/Icons'

function App() {
  const [answers, setAnswers] = useState(Array(5).fill(Array(6).fill(null)))
  return (
    <>
      <header className="text-white flex justify-between p-4 border-b">
        <InfoIcon />
        <h2 className="text-2xl font-bold">Bobodle</h2>
        <GithubIcon />
      </header>
      <main className="flex justify-center">
        <section className="h-96 flex flex-col items-center gap-4">
          {answers.map((data, index) => {
            return (
              <article key={index} className="grid grid-cols-6 gap-2 w-96 h-96">
                {data.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-[#ffffff60] h-full w-full rounded-md border"
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
    </>
  )
}

export default App

// boboled
