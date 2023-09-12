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

        </UserAnswerProvider>
      </UserGameDataProvider>
    </GameDataProvider>
  )
}

export default App
