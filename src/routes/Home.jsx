import { Link } from 'react-router-dom'

export function Home () {
  return (
    <>
      <main className="h-[90vh] flex flex-col items-center text-light-mode-text dark:text-dark-mode-text">
        <div className="text-center">
          <h1 className="text-5xl font-bold italic">Juega Latinoled</h1>
          <span className="font-semibold text-2xl italic">
            El wordle latino
          </span>
        </div>

        <Link
          to={'/jugar'}
          className="bg-[#212529] text-white px-6 py-3 rounded-md hover:bg-[#343A40] transition-colors font-bold text-center"
        >
          Jugar
        </Link>
      </main>
    </>
  )
}
