import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GameBoard } from './routes/GameBoardPage'
import { Home } from './routes/Home'
import { Header } from './components/Header'
import { UserGameDataProvider } from './context/userGameDataContext'
import { GameDataProvider } from './context/gameDataContext'
import { UserAnswerProvider } from './context/userAnswersContext'

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Header />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'jugar',
          element: <GameBoard />
        }
      ]
    }
  ])
  return (
    <GameDataProvider>
      <UserGameDataProvider>
        <UserAnswerProvider>

          <RouterProvider router={router} />
          <p className='absolute bottom-0 text-light-mode-text dark:text-dark-mode-text text-xs p-2 font-bold'>Test Version 1.0</p>
        </UserAnswerProvider>
      </UserGameDataProvider>
    </GameDataProvider>
  )
}

export default App
