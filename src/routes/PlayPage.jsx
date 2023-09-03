import { Board } from '../components/Board'
import { Header } from '../components/Header'
import { GameDataProvider } from '../context/gameDataContext'
import { UserAnswerProvider } from '../context/userAnswersContext'

export function GameBoard () {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center dark:text-white">
        <GameDataProvider>
          <UserAnswerProvider>

            <Board />

          </UserAnswerProvider>
        </GameDataProvider>
      </main>
    </>
  )
}
