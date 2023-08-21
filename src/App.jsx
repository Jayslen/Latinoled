import { Board } from './components/Board'
import { Header } from './components/Header'
import { Keyboard } from './components/Keyboard'
import { GameDataProvider } from './components/context/gameData'

function App () {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <GameDataProvider>
          <Board />
          <Keyboard />
        </GameDataProvider>

      </main>
    </>
  )
}

export default App
