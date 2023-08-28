import { Board } from './components/Board'
import { Header } from './components/Header'
import { Keyboard } from './components/Keyboard'
import { GameDataProvider } from './context/gameDataContext'
import { UserAnswerProvider } from './context/userAnswersContext'

function App () {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <GameDataProvider>
          <UserAnswerProvider>
            <Board />
            <Keyboard />
          </UserAnswerProvider>
        </GameDataProvider>

      </main>
    </>
  )
}

export default App
