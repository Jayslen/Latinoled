import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GameBoard } from './routes/GameBoardPage'
import { Home } from './routes/Home'
import { Header } from './components/Header'
import { GameDataProvider } from './context/gameDataContext'

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
      <RouterProvider router={router} />
    </GameDataProvider>
  )
}

export default App
