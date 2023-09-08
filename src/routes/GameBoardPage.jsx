import { Board } from '../components/Board'
import { Keyboard } from '../components/Keyboard'
import { UserAnswerProvider } from '../context/userAnswersContext'

export function GameBoard () {
  return (
    <>
      <main className="flex flex-col items-center dark:text-white">
          <UserAnswerProvider>

            <Board />
            {/* <Keyboard/> */}

          </UserAnswerProvider>
      </main>
    </>
  )
}
