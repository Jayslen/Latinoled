export function GameMoldal ({ resetAttempt }) {
  return (
        <section className='bg-black bg-opacity-75 absolute top-0 w-screen h-screen grid place-content-center'>
            <article className='bg-[#d2d2d2] w-96 h-96 rounded-md flex items-center justify-center'>
                <button className='bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-800 transition-colors font-bold' onClick={resetAttempt}>Start New Game</button>
            </article>
        </section>
  )
}
