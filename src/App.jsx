import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GameBoard } from './routes/PlayPage'

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>hello</div>
    },
    {
      path: 'jugar',
      element: <GameBoard />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
