import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GameBoard } from './routes/PlayPage'
import { Home } from './routes/Home'
import { Header } from './components/Header'

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
  return (<RouterProvider router={router} />)
}

export default App
