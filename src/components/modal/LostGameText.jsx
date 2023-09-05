export function LostGameData ({ word, meaning }) {
  return (
    <div>
      <h2 className="font-bold text-xl text-center">
        Mala suerte no haz adivinado la palabra.
      </h2>
      <p>
        La palabra para adivinar era <strong>{word}</strong>{' '}
      </p>
      <p>Su significado es: {meaning}</p>
    </div>
  )
}
