import { Board } from './components/Board'
import { Header } from './components/Header'
import { Keyboard } from './components/Keyboard'
function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <Board />
        <Keyboard />
      </main>
    </>
  )
}

export default App
