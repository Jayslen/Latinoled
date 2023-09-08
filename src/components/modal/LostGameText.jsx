export function LostGameData ({ word, meaning }) {
  return (
    <div>
      <h2 className="font-bold text-xl text-center">
        Mala suerte no haz adivinado la palabra.
      </h2>
      <p className='text-md'>
        La palabra para adivinar era <strong>{word}</strong>{' '}
      </p>
      <p className='text-md inline-block font-bold'>Su significado es:</p>
      <span className='text-sm'>{meaning}</span>
    </div>
  )
}
