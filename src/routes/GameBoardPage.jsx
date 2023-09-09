import { useContext } from 'react'
import { Board } from '../components/Board'
import { Keyboard } from '../components/Keyboard'
import { UserAnswerProvider } from '../context/userAnswersContext'
import { GameData } from '../context/gameDataContext'

export function GameBoard () {
  const { state: { country } } = useContext(GameData)
  return (
    <>
      <main className="flex justify-center dark:text-white">
        <section className="flex flex-col gap-2 w-[310px] px-4 sm:w-[350px] sm:p-0">
          <UserAnswerProvider>
            <Board />
            <Keyboard />
          </UserAnswerProvider>
        </section>
      </main>
    </>
  )
}
