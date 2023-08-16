import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello</div>,
    },
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
