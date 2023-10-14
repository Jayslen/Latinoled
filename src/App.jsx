import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GameBoard } from './routes/GameBoardPage'
import { Home } from './routes/Home'
import { Header } from './components/Header'
import { UserGameDataProvider } from './context/userGameDataContext'
import { GameDataProvider } from './context/gameDataContext'
import { UserAnswerProvider } from './context/userAnswersContext'
import { ToastContainer } from 'react-toastify'

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
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
          />
          <RouterProvider router={router} />
          <div className="absolute bottom-0 text-light-mode-text dark:text-dark-mode-text text-sm p-2 font-bold -z-20">
            <p>Test Version 1.1</p>
            <p>Created by Jayslen Rojas</p>
          </div>
        </UserAnswerProvider>
      </UserGameDataProvider>
    </GameDataProvider>
  )
}

export default App
