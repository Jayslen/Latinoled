export function WinGameData ({ word, meaning, attempt }) {
  return (
    <div>
      <h2 className="font-bold text-xl text-center">
        Bien hecho haz adivinado la palabra.
      </h2>
      <p>
        <strong>La palabra {word} significa</strong>: {meaning}
      </p>
      <p className="text-lg">La haz adivinado en el intento {attempt}</p>
    </div>
  )
}
