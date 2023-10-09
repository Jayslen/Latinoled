export function EndGameInfo ({ word, meaning, title }) {
  return (
    <div className="text-center">
      <h2 className="font-bold text-4xl sm:text-5xl">{title}</h2>
      <p className="text-lg">
        La palabra para adivinar era
        <strong className="block text-3xl capitalize sm:text-4xl">{word}</strong>{' '}
      </p>
      <details className='border-[1px] border-[#aaa] rounded px-[0.5em] max-w-xs m-auto open:p-1 group'>
        <summary className='font-bold text-lg -mx-2 p-1 border-b-0 border-b-[#aaa] group-open:border-b-[1px]'>
        Significado
        </summary>
        {meaning}
      </details>
    </div>
  )
}
